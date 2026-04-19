package bot

import (
	"context"
	"fmt"
	"log"
	"mw-telegram-bot/internal/config"
	"mw-telegram-bot/internal/openapi"
	"mw-telegram-bot/internal/services"
	"net/http"
	"regexp"
	"strings"
	"sync"
	"time"

	"github.com/go-telegram-bot-api/telegram-bot-api"
	"github.com/robfig/cron/v3"
)

type JobDoneState struct {
	Description  string
	OwnerUuid    string
	UserName     string
	WayUuid      string
	WayName      string
	Step         string
	Ways         []services.UserWay
	Command      string
}

type PlanState struct {
	Description string
	OwnerUuid   string
	UserName    string
	WayUuid     string
	WayName     string
	Time        int32
	Step        string
	Ways        []services.UserWay
}

type ProblemState struct {
	Description string
	OwnerUuid   string
	UserName    string
	WayUuid     string
	WayName     string
	Step        string
	Ways        []services.UserWay
}

type TelegramBot struct {
	config         *config.Config
	authService    *services.AuthService
	bot            *tgbotapi.BotAPI
	stopChan       chan struct{}
	isRunning      bool
	jobDoneStates  map[int64]JobDoneState
	planStates     map[int64]PlanState
	problemStates  map[int64]ProblemState
	linkedUsers    map[int64]*services.LinkedUser
	cron           *cron.Cron
	mu             sync.RWMutex
}

func NewTelegramBot(cfg *config.Config, authService *services.AuthService) (*TelegramBot, error) {
	bot, err := tgbotapi.NewBotAPI(cfg.TelegramBotToken)
	if err != nil {
		return nil, fmt.Errorf("failed to create bot: %w", err)
	}

	log.Printf("Authorized on account %s", bot.Self.UserName)

return &TelegramBot{
		config:         cfg,
		authService:    authService,
		bot:            bot,
		stopChan:       make(chan struct{}),
		jobDoneStates:  make(map[int64]JobDoneState),
		planStates:     make(map[int64]PlanState),
		problemStates:  make(map[int64]ProblemState),
		linkedUsers:    make(map[int64]*services.LinkedUser),
	}, nil
}

func (b *TelegramBot) Start() error {
	b.isRunning = true

	if b.config.TelegramBotMode == "webhook" {
		return b.startWithWebhook()
	}
	return b.startWithPolling()
}

func (b *TelegramBot) startWithWebhook() error {
	_, err := b.bot.SetWebhook(tgbotapi.NewWebhook(b.config.TelegramBotWebhook))
	if err != nil {
		return fmt.Errorf("failed to set webhook: %w", err)
	}

	log.Printf("Webhook set to %s", b.config.TelegramBotWebhook)

	webhookInfo, err := b.bot.GetWebhookInfo()
	if err != nil {
		log.Printf("Warning: failed to get webhook info: %v", err)
	} else {
		log.Printf("Webhook info: URL=%s, pending_updates=%d, has_custom_cert=%t",
			webhookInfo.URL, webhookInfo.PendingUpdateCount, webhookInfo.HasCustomCertificate)
	}

	updates := b.bot.ListenForWebhook("/telegram/webhook/")
	go func() {
		for update := range updates {
			b.handleUpdate(update)
		}
	}()

	addr := ":" + b.config.ServerPort
	log.Printf("Starting HTTP server on %s", addr)
	go func() {
		if err := http.ListenAndServe(addr, nil); err != nil && err != http.ErrServerClosed {
			log.Printf("HTTP server error: %v", err)
		}
	}()

	<-b.stopChan
	return nil
}

func (b *TelegramBot) startWithPolling() error {
	if err := b.deleteWebhook(); err != nil {
		log.Printf("Warning: failed to delete webhook: %v", err)
	} else {
		log.Println("Webhook deleted successfully, switching to polling mode")
	}

	u := tgbotapi.NewUpdate(0)
	u.Timeout = 60

	updates, err := b.bot.GetUpdatesChan(u)
	if err != nil {
		return fmt.Errorf("failed to get updates channel: %w", err)
	}

	for b.isRunning {
		select {
		case <-b.stopChan:
			log.Println("Stop signal received, shutting down...")
			return nil
		case update := <-updates:
			b.handleUpdate(update)
		}
	}

	return nil
}

// TODO: Delete this method when switching to webhook mode permanently.
// This is needed because Telegram doesn't allow getUpdates while a webhook is active.
func (b *TelegramBot) deleteWebhook() error {
	url := fmt.Sprintf("https://api.telegram.org/bot%s/deleteWebhook", b.config.TelegramBotToken)
	resp, err := http.Post(url, "application/json", nil)
	if err != nil {
		return fmt.Errorf("failed to call deleteWebhook: %w", err)
	}
	defer resp.Body.Close()
	if resp.StatusCode != 200 {
		return fmt.Errorf("deleteWebhook returned status %d", resp.StatusCode)
	}
	return nil
}

func (b *TelegramBot) handleUpdate(update tgbotapi.Update) {
	if update.Message == nil {
		return
	}

	chatID := update.Message.Chat.ID
	user := update.Message.From
	text := update.Message.Text

	log.Printf("[%s] %s (ID: %d) sent: %s", user.UserName, update.Message.Chat.Title, chatID, text)

	if text == "/cancel" {
		b.cancelAllStates(chatID, user)
		return
	}

	b.mu.Lock()
	_, inJobDoneState := b.jobDoneStates[int64(user.ID)]
	planState, inPlanState := b.planStates[int64(user.ID)]
	problemState, inProblemState := b.problemStates[int64(user.ID)]
	b.mu.Unlock()

	if inJobDoneState {
		b.handleMessageForJobDoneState(chatID, text, user)
		return
	}

	if inPlanState && planState.Step != "" {
		b.handleMessageForPlanState(chatID, text, user)
		return
	}

	if inProblemState && problemState.Step != "" {
		b.handleMessageForProblemState(chatID, text, user)
		return
	}

	switch {
	case strings.HasPrefix(text, "/start"):
		b.sendStartMessage(chatID)
	case strings.HasPrefix(text, "/help"):
		b.sendHelpMessage(chatID)
	case strings.HasPrefix(text, "/login"):
		log.Printf("Login command detected, calling handleLoginCommand")
		b.handleLoginCommand(chatID, user)
	case strings.HasPrefix(text, "/link"):
		b.handleLinkCommand(chatID, text, user)
	case strings.HasPrefix(text, "/jobdone"):
		b.handleJobDoneCommand(chatID, text, user)
	case strings.HasPrefix(text, "/plan"):
		b.handlePlanCommand(chatID, text, user)
	case strings.HasPrefix(text, "/problem"):
		b.handleProblemCommand(chatID, text, user)
	case strings.HasPrefix(text, "/comment"):
		b.handleCommentCommand(chatID, text, user)
	case strings.HasPrefix(text, "/ways"):
		b.handleWaysCommand(chatID, user)
	case strings.HasPrefix(text, "/status"):
		b.sendStatusMessage(chatID, user)
	case strings.HasPrefix(text, "/logout"):
		b.handleLogoutCommand(chatID, user)
	default:
		b.sendUnknownCommandMessage(chatID)
	}
}

func (b *TelegramBot) handleMessageForJobDoneState(chatID int64, text string, user *tgbotapi.User) {
	b.mu.Lock()
	state, exists := b.jobDoneStates[int64(user.ID)]
	b.mu.Unlock()

	if !exists {
		return
	}

	switch state.Step {
	case "select_way":
		b.handleWaySelection(chatID, text, user)
	case "enter_time":
		b.handleTimeEntry(chatID, text, user)
	}
}

func (b *TelegramBot) sendStartMessage(chatID int64) {
	msg := tgbotapi.NewMessage(chatID, "Welcome to Masters Way Bot!\n\nHere are available commands:\n/login - Link your Google account\n/ways - View your ways with links\n/jobdone <description> - Log your completed work\n/plan <description> - Create a future plan\n/problem <description> - Log a problem\n/comment <description> - Add a comment\n/help - Show this help message\n/status - Check bot status\n\nTip: Visit mastersway.netlify.app for extended features!\n\nUse /login first to connect your account!")

	b.sendMessage(msg)
}

func (b *TelegramBot) sendHelpMessage(chatID int64) {
	msg := tgbotapi.NewMessage(chatID, `Masters Way Bot Help

Available commands:
/start - Get started with the bot
/login - Link your Google account to use the bot
/logout - Unlink your account
/ways - View your ways with links
/jobdone <description> - Log your completed work
/plan <description> - Create a plan for the future
/problem <description> - Log a problem you're facing
/comment <description> - Add a comment to your progress
/status - Check bot status
/help - Show this help message
/cancel - Cancel current operation

Tip: Visit mastersway.netlify.app anytime for extended features like detailed analytics, AI-generated test questions, practice materials, and more!

How to use:
1. Run /login to get an authentication link
2. Click the link and sign in with Google
3. Enter the code shown in Telegram
4. Now you can log your progress!

Examples:
/jobdone "Studied 2 hours of Go programming"
/plan "Complete chapter 5"
/problem "Error connecting to database"
/comment "Great progress today!"`)

	b.sendMessage(msg)
}

func (b *TelegramBot) sendStatusMessage(chatID int64, user *tgbotapi.User) {
	log.Printf("sendStatusMessage: userId=%d, UserToken=%s", user.ID, openapi.UserToken)

	linkedUser, err := b.authService.GetLinkedUser(context.Background(), int64(user.ID))

	var statusMsg string
	if err != nil {
		log.Printf("sendStatusMessage: GetLinkedUser error: %v", err)
		statusMsg = "📋 Bot Status:\n- Connected to API: ✅\n- Your account: ❌ Not linked\n\nUse /login to link your Google account!"
	} else {
		statusMsg = fmt.Sprintf("📋 Bot Status:\n- Connected to API: ✅\n- Linked account: ✅ %s\n- Email: %s", linkedUser.Name, linkedUser.Email)
	}

	fullMsg := fmt.Sprintf("%s\n\nEnvironment: %s\nMode: %s", statusMsg, b.config.EnvType, b.config.TelegramBotMode)

	msg := tgbotapi.NewMessage(chatID, fullMsg)
	b.sendMessage(msg)
}

func (b *TelegramBot) handleWaysCommand(chatID int64, user *tgbotapi.User) {
	linkedUser, err := b.authService.GetLinkedUser(context.Background(), int64(user.ID))
	if err != nil {
		msg := tgbotapi.NewMessage(chatID, `❌ You need to link your account first!

Use /login to connect your Google account, then you can view your ways.`)
		b.sendMessage(msg)
		return
	}

	openapi.UserToken = linkedUser.Token

	ways, err := b.authService.GetUserWays(context.Background(), linkedUser.UserUuid)
	if err != nil {
		errorMsg := tgbotapi.NewMessage(chatID, fmt.Sprintf("Failed to get your ways: %v\n\nPlease try again later.", err))
		b.sendMessage(errorMsg)
		return
	}

	if len(ways) == 0 {
		msg := tgbotapi.NewMessage(chatID, `❌ You don't have any ways yet!

Create a way in the app first.`)
		b.sendMessage(msg)
		return
	}

	waysText := "📚 Your Ways:\n\n"
	baseURL := b.config.FrontendBaseURL
	if baseURL == "" {
		baseURL = "https://mastersway.netlify.app/way/"
	}
	for _, way := range ways {
		status := ""
		if way.IsCompleted {
			status = " ✅"
		}
		link := baseURL + way.Uuid
		waysText += fmt.Sprintf("%s%s\n%s\n\n", way.Name, status, link)
	}

	msg := tgbotapi.NewMessage(chatID, waysText)
	b.sendMessage(msg)
}

func (b *TelegramBot) handleLoginCommand(chatID int64, user *tgbotapi.User) {
	log.Printf("handleLoginCommand called for user ID: %d, username: %s", user.ID, user.UserName)

	tgName := user.UserName

	result, err := b.authService.InitiateTelegramLogin(context.Background(), int64(user.ID), tgName)
	if err != nil {
		log.Printf("Error in InitiateTelegramLogin: %v", err)
		errorMsg := tgbotapi.NewMessage(chatID, fmt.Sprintf("❌ Failed to initiate login: %v\n\nPlease try again.", err))
		b.sendMessage(errorMsg)
		return
	}

	log.Printf("Login initiated successfully. Code: %s, URL length: %d", result.Code, len(result.AuthURL))

	msg := tgbotapi.NewMessage(chatID, fmt.Sprintf(`🔐 To link your Google account:

1. Click the link below to sign in with Google:
%s

2. After signing in, you'll receive a confirmation
3. Enter this code in Telegram: /link %s

Note: The code expires in 10 minutes.`, result.AuthURL, result.Code))

	b.sendMessage(msg)
}

func (b *TelegramBot) handleLinkCommand(chatID int64, text string, user *tgbotapi.User) {
	code := strings.TrimPrefix(text, "/link")
	code = strings.TrimSpace(code)

	if code == "" {
		msg := tgbotapi.NewMessage(chatID, `Please provide the code from Google login.

Example: /link ABC123

Use /login first to get an authentication link.`)
		b.sendMessage(msg)
		return
	}

	log.Printf("handleLinkCommand: validating code %s for user %d", code, user.ID)

	result, err := b.authService.ValidateTelegramLogin(context.Background(), code, int64(user.ID), user.UserName)
	if err != nil {
		log.Printf("handleLinkCommand: validation failed: %v", err)
		errorMsg := tgbotapi.NewMessage(chatID, fmt.Sprintf("❌ Validation failed: %v\n\nPlease try /login again to get a new code.", err))
		b.sendMessage(errorMsg)
		return
	}

	log.Printf("handleLinkCommand: validation succeeded for user %s (%s)", *result.Name, *result.Email)

	name := *result.Name
	if name == "" {
		name = "User"
	}

	token := result.GetToken()
	log.Printf("handleLinkCommand: token from response: %s", token)
	openapi.UserToken = token

	linkedUser := &services.LinkedUser{
		UserUuid: *result.UserUuid,
		Name:     name,
		Email:    *result.Email,
		Token:   token,
	}
	b.RegisterLinkedUser(int64(user.ID), linkedUser)

	successMsg := tgbotapi.NewMessage(chatID, fmt.Sprintf(`✅ Successfully linked!

Welcome, %s!
Your account (%s) is now connected. You can now use /jobdone to log your progress.`, name, *result.Email))

	log.Printf("handleLinkCommand: sending success message")
	b.sendMessage(successMsg)
	log.Printf("handleLinkCommand: success message sent")
}

func (b *TelegramBot) handleLogoutCommand(chatID int64, user *tgbotapi.User) {
	err := b.authService.UnlinkTelegram(context.Background(), int64(user.ID))
	if err != nil {
		msg := tgbotapi.NewMessage(chatID, fmt.Sprintf("❌ Failed to unlink account: %v\n\nYou may not be linked yet.", err))
		b.sendMessage(msg)
		return
	}

	b.mu.Lock()
	delete(b.linkedUsers, int64(user.ID))
	b.mu.Unlock()

	openapi.UserToken = ""

	msg := tgbotapi.NewMessage(chatID, "✅ Your account has been unlinked. Use /login to link again.")
	b.sendMessage(msg)
}

func (b *TelegramBot) handleJobDoneCommand(chatID int64, text string, user *tgbotapi.User) {
	description := strings.TrimPrefix(text, "/jobdone")
	description = strings.TrimSpace(description)

	if description == "" {
		msg := tgbotapi.NewMessage(chatID, `Please provide a description of your completed work.

Example:
/jobdone "Completed 3 problems on LeetCode"
/jobdone "Read chapter 10 of the Python book"`)

		b.sendMessage(msg)
		return
	}

	linkedUser, err := b.authService.GetLinkedUser(context.Background(), int64(user.ID))
	if err != nil {
		msg := tgbotapi.NewMessage(chatID, `❌ You need to link your account first!

Use /login to connect your Google account, then you can log your progress.`)

		b.sendMessage(msg)
		return
	}

	openapi.UserToken = linkedUser.Token

	ways, err := b.authService.GetUserWays(context.Background(), linkedUser.UserUuid)
	if err != nil {
		errorMsg := tgbotapi.NewMessage(chatID, fmt.Sprintf("Failed to get your ways: %v\n\nPlease try again later.", err))
		b.sendMessage(errorMsg)
		return
	}

	if len(ways) == 0 {
		msg := tgbotapi.NewMessage(chatID, `❌ You don't have any ways yet!

Create a way in the app first, then you can log your job done here.`)
		b.sendMessage(msg)
		return
	}

	if len(ways) == 1 {
		b.askForTimeAndSaveJobDone(chatID, user, linkedUser, description, ways[0].Uuid, ways[0].Name)
		return
	}

	b.askUserToSelectWay(chatID, user, linkedUser, description, ways)
}

func (b *TelegramBot) askUserToSelectWay(chatID int64, user *tgbotapi.User, linkedUser *services.LinkedUser, description string, ways []services.UserWay) {
	waysText := "Select a way to save your progress:\n\n"
	for i, way := range ways {
		status := ""
		if way.IsCompleted {
			status = " (completed)"
		}
		waysText += fmt.Sprintf("%d. %s%s\n", i+1, way.Name, status)
	}
	waysText += "\nOr type /cancel to cancel"

	msg := tgbotapi.NewMessage(chatID, waysText)
	b.sendMessage(msg)

	b.jobDoneStates[int64(user.ID)] = JobDoneState{
		Description: description,
		OwnerUuid:   linkedUser.UserUuid,
		UserName:    linkedUser.Name,
		Step:        "select_way",
		Ways:        ways,
	}
}

func (b *TelegramBot) handleWaySelection(chatID int64, text string, user *tgbotapi.User) {
	state, exists := b.jobDoneStates[int64(user.ID)]
	if !exists || state.Step != "select_way" {
		return
	}

	text = strings.TrimSpace(text)
	choice := 0
	_, err := fmt.Sscanf(text, "%d", &choice)
	if err != nil || choice < 1 || choice > len(state.Ways) {
		msg := tgbotapi.NewMessage(chatID, "Invalid selection. Please enter a number from the list:")
		b.sendMessage(msg)
		return
	}

	selectedWay := state.Ways[choice-1]
	delete(b.jobDoneStates, int64(user.ID))

	b.askForTimeAndSaveJobDone(chatID, user, &services.LinkedUser{
		UserUuid: state.OwnerUuid,
		Name:     state.UserName,
	}, state.Description, selectedWay.Uuid, selectedWay.Name)
}

func (b *TelegramBot) askForTimeAndSaveJobDone(chatID int64, user *tgbotapi.User, linkedUser *services.LinkedUser, description, wayUuid, wayName string) {
	msg := tgbotapi.NewMessage(chatID, fmt.Sprintf(`Selected way: %s

How much time did you spend on this? (in minutes)

Examples: 30, 45, 60, 1h 30m`, wayName))
	b.sendMessage(msg)

	b.jobDoneStates[int64(user.ID)] = JobDoneState{
		Description: description,
		OwnerUuid:   linkedUser.UserUuid,
		UserName:    linkedUser.Name,
		WayUuid:     wayUuid,
		WayName:     wayName,
		Step:        "enter_time",
	}
}

func (b *TelegramBot) handleTimeEntry(chatID int64, text string, user *tgbotapi.User) {
	state, exists := b.jobDoneStates[int64(user.ID)]
	if !exists || state.Step != "enter_time" {
		return
	}

	text = strings.TrimSpace(text)
	timeSpent := b.parseTimeFromText(text)
	delete(b.jobDoneStates, int64(user.ID))

	waitingMsg := tgbotapi.NewMessage(chatID, "📝 Saving your progress...")
	b.sendMessage(waitingMsg)

	result, err := b.authService.CreateJobDone(context.Background(), state.OwnerUuid, state.Description, state.WayUuid, timeSpent)
	if err != nil {
		errorMsg := tgbotapi.NewMessage(chatID, fmt.Sprintf("Failed to log your progress: %v\n\nPlease try again later.", err))
		b.sendMessage(errorMsg)
		return
	}

	successMsg := tgbotapi.NewMessage(chatID, fmt.Sprintf(`✅ Job logged successfully!

Details:
- Description: %s
- Time: %d minutes
- Way: %s

Great job on your progress, %s! 🎉`, result.Description, result.Time, result.WayName, state.UserName))
	b.sendMessage(successMsg)
}

func (b *TelegramBot) parseTimeFromText(text string) int32 {
	text = strings.ToLower(text)

	hours := int32(0)
	minutes := int32(0)

	hourMatch := regexp.MustCompile(`(\d+)\s*(h|hour|hours)`).FindStringSubmatch(text)
	if hourMatch != nil {
		fmt.Sscanf(hourMatch[1], "%d", &hours)
	}

	minMatch := regexp.MustCompile(`(\d+)\s*(m|min|minute|minutes)`).FindStringSubmatch(text)
	if minMatch != nil {
		fmt.Sscanf(minMatch[1], "%d", &minutes)
	}

	if hours == 0 && minutes == 0 {
		numMatch := regexp.MustCompile(`(\d+)`).FindStringSubmatch(text)
		if numMatch != nil {
			fmt.Sscanf(numMatch[1], "%d", &minutes)
		}
	}

	totalMinutes := hours*60 + minutes
	if totalMinutes == 0 {
		totalMinutes = 30
	}

	return totalMinutes
}

func (b *TelegramBot) cancelAllStates(chatID int64, user *tgbotapi.User) {
	b.mu.Lock()
	delete(b.jobDoneStates, int64(user.ID))
	delete(b.planStates, int64(user.ID))
	delete(b.problemStates, int64(user.ID))
	b.mu.Unlock()
	msg := tgbotapi.NewMessage(chatID, "❌ Operation cancelled.")
	b.sendMessage(msg)
}

func (b *TelegramBot) cancelJobDone(chatID int64, user *tgbotapi.User) {
	delete(b.jobDoneStates, int64(user.ID))
	msg := tgbotapi.NewMessage(chatID, "❌ Job done recording cancelled.")
	b.sendMessage(msg)
}

func (b *TelegramBot) estimateTimeFromDescription(description string) int32 {
	lowerDesc := strings.ToLower(description)

	timeKeywords := map[string]int32{
		"hour":    60,
		"hours":   60,
		"h":       60,
		"min":     1,
		"minute":  1,
		"minutes": 1,
	}

	for keyword, minutes := range timeKeywords {
		if strings.Contains(lowerDesc, keyword) {
			return minutes * 15
		}
	}

	return 30
}

func (b *TelegramBot) handlePlanCommand(chatID int64, text string, user *tgbotapi.User) {
	description := strings.TrimPrefix(text, "/plan")
	description = strings.TrimSpace(description)

	if description == "" {
		msg := tgbotapi.NewMessage(chatID, `Please provide a description for your plan.

Example:
/plan "Complete 5 problems on LeetCode"
/plan "Read chapter 5 of the Go book"`)
		b.sendMessage(msg)
		return
	}

	linkedUser, err := b.authService.GetLinkedUser(context.Background(), int64(user.ID))
	if err != nil {
		msg := tgbotapi.NewMessage(chatID, `❌ You need to link your account first!

Use /login to connect your Google account, then you can create plans.`)
		b.sendMessage(msg)
		return
	}

	openapi.UserToken = linkedUser.Token

	ways, err := b.authService.GetUserWays(context.Background(), linkedUser.UserUuid)
	if err != nil {
		errorMsg := tgbotapi.NewMessage(chatID, fmt.Sprintf("Failed to get your ways: %v\n\nPlease try again later.", err))
		b.sendMessage(errorMsg)
		return
	}

	if len(ways) == 0 {
		msg := tgbotapi.NewMessage(chatID, `❌ You don't have any ways yet!

Create a way in the app first, then you can create plans here.`)
		b.sendMessage(msg)
		return
	}

	if len(ways) == 1 {
		b.askForPlanTimeAndSave(chatID, user, linkedUser, description, ways[0].Uuid, ways[0].Name)
		return
	}

	b.askUserToSelectWayForPlan(chatID, user, linkedUser, description, ways)
}

func (b *TelegramBot) askUserToSelectWayForPlan(chatID int64, user *tgbotapi.User, linkedUser *services.LinkedUser, description string, ways []services.UserWay) {
	waysText := "Select a way for your plan:\n\n"
	for i, way := range ways {
		waysText += fmt.Sprintf("%d. %s\n", i+1, way.Name)
	}
	waysText += "\nOr type /cancel to cancel"

	msg := tgbotapi.NewMessage(chatID, waysText)
	b.sendMessage(msg)

	b.planStates[int64(user.ID)] = PlanState{
		Description: description,
		OwnerUuid:   linkedUser.UserUuid,
		UserName:    linkedUser.Name,
		Step:       "select_way",
		Ways:       ways,
	}
}

func (b *TelegramBot) handleMessageForPlanState(chatID int64, text string, user *tgbotapi.User) {
	b.mu.Lock()
	state, exists := b.planStates[int64(user.ID)]
	b.mu.Unlock()

	if !exists {
		return
	}

	switch state.Step {
	case "select_way":
		b.handlePlanWaySelection(chatID, text, user)
	case "enter_time":
		b.handlePlanTimeEntry(chatID, text, user)
	case "comment_select_way":
		b.handleCommentWaySelection(chatID, text, user)
	}
}

func (b *TelegramBot) handlePlanWaySelection(chatID int64, text string, user *tgbotapi.User) {
	b.mu.Lock()
	state, exists := b.planStates[int64(user.ID)]
	if !exists || state.Step != "select_way" {
		b.mu.Unlock()
		return
	}
	b.mu.Unlock()

	text = strings.TrimSpace(text)
	choice := 0
	_, err := fmt.Sscanf(text, "%d", &choice)
	if err != nil || choice < 1 || choice > len(state.Ways) {
		msg := tgbotapi.NewMessage(chatID, "Invalid selection. Please enter a number from the list:")
		b.sendMessage(msg)
		return
	}

	selectedWay := state.Ways[choice-1]
	b.mu.Lock()
	delete(b.planStates, int64(user.ID))
	b.mu.Unlock()

	b.askForPlanTimeAndSave(chatID, user, &services.LinkedUser{
		UserUuid: state.OwnerUuid,
		Name:     state.UserName,
	}, state.Description, selectedWay.Uuid, selectedWay.Name)
}

func (b *TelegramBot) askForPlanTimeAndSave(chatID int64, user *tgbotapi.User, linkedUser *services.LinkedUser, description, wayUuid, wayName string) {
	msg := tgbotapi.NewMessage(chatID, fmt.Sprintf(`Selected way: %s

How much time do you estimate for this plan? (in minutes)

Examples: 30, 45, 60, 1h 30m`, wayName))
	b.sendMessage(msg)

	b.planStates[int64(user.ID)] = PlanState{
		Description: description,
		OwnerUuid:   linkedUser.UserUuid,
		UserName:    linkedUser.Name,
		WayUuid:     wayUuid,
		WayName:     wayName,
		Step:       "enter_time",
	}
}

func (b *TelegramBot) handlePlanTimeEntry(chatID int64, text string, user *tgbotapi.User) {
	b.mu.Lock()
	state, exists := b.planStates[int64(user.ID)]
	if !exists || state.Step != "enter_time" {
		b.mu.Unlock()
		return
	}
	b.mu.Unlock()

	text = strings.TrimSpace(text)
	timeEst := b.parseTimeFromText(text)
	b.mu.Lock()
	delete(b.planStates, int64(user.ID))
	b.mu.Unlock()

	waitingMsg := tgbotapi.NewMessage(chatID, "📝 Saving your plan...")
	b.sendMessage(waitingMsg)

	result, err := b.authService.CreatePlan(context.Background(), state.OwnerUuid, state.Description, state.WayUuid, timeEst)
	if err != nil {
		errorMsg := tgbotapi.NewMessage(chatID, fmt.Sprintf("Failed to create plan: %v\n\nPlease try again later.", err))
		b.sendMessage(errorMsg)
		return
	}

	successMsg := tgbotapi.NewMessage(chatID, fmt.Sprintf(`✅ Plan created successfully!

Details:
- Description: %s
- Estimated Time: %d minutes
- Way: %s

Good planning, %s! 🎉`, result.Description, result.Time, result.WayName, state.UserName))
	b.sendMessage(successMsg)
}

func (b *TelegramBot) handleProblemCommand(chatID int64, text string, user *tgbotapi.User) {
	description := strings.TrimPrefix(text, "/problem")
	description = strings.TrimSpace(description)

	if description == "" {
		msg := tgbotapi.NewMessage(chatID, `Please describe the problem you encountered.

Example:
/problem "Getting error when trying to connect to the database"
/problem "Can't understand the recursion concept"`)
		b.sendMessage(msg)
		return
	}

	linkedUser, err := b.authService.GetLinkedUser(context.Background(), int64(user.ID))
	if err != nil {
		msg := tgbotapi.NewMessage(chatID, `❌ You need to link your account first!

Use /login to connect your Google account, then you can log problems.`)
		b.sendMessage(msg)
		return
	}

	openapi.UserToken = linkedUser.Token

	ways, err := b.authService.GetUserWays(context.Background(), linkedUser.UserUuid)
	if err != nil {
		errorMsg := tgbotapi.NewMessage(chatID, fmt.Sprintf("Failed to get your ways: %v\n\nPlease try again later.", err))
		b.sendMessage(errorMsg)
		return
	}

	if len(ways) == 0 {
		msg := tgbotapi.NewMessage(chatID, `❌ You don't have any ways yet!

Create a way in the app first, then you can log problems here.`)
		b.sendMessage(msg)
		return
	}

	if len(ways) == 1 {
		b.saveProblem(chatID, user, linkedUser, description, ways[0].Uuid, ways[0].Name)
		return
	}

	b.askUserToSelectWayForProblem(chatID, user, linkedUser, description, ways)
}

func (b *TelegramBot) askUserToSelectWayForProblem(chatID int64, user *tgbotapi.User, linkedUser *services.LinkedUser, description string, ways []services.UserWay) {
	waysText := "Select a way for your problem:\n\n"
	for i, way := range ways {
		waysText += fmt.Sprintf("%d. %s\n", i+1, way.Name)
	}
	waysText += "\nOr type /cancel to cancel"

	msg := tgbotapi.NewMessage(chatID, waysText)
	b.sendMessage(msg)

	b.problemStates[int64(user.ID)] = ProblemState{
		Description: description,
		OwnerUuid:   linkedUser.UserUuid,
		UserName:    linkedUser.Name,
		Step:       "select_way",
		Ways:       ways,
	}
}

func (b *TelegramBot) handleMessageForProblemState(chatID int64, text string, user *tgbotapi.User) {
	b.mu.Lock()
	state, exists := b.problemStates[int64(user.ID)]
	b.mu.Unlock()

	if !exists {
		return
	}

	switch state.Step {
	case "select_way":
		b.handleProblemWaySelection(chatID, text, user)
	}
}

func (b *TelegramBot) handleProblemWaySelection(chatID int64, text string, user *tgbotapi.User) {
	b.mu.Lock()
	state, exists := b.problemStates[int64(user.ID)]
	if !exists || state.Step != "select_way" {
		b.mu.Unlock()
		return
	}
	b.mu.Unlock()

	text = strings.TrimSpace(text)
	choice := 0
	_, err := fmt.Sscanf(text, "%d", &choice)
	if err != nil || choice < 1 || choice > len(state.Ways) {
		msg := tgbotapi.NewMessage(chatID, "Invalid selection. Please enter a number from the list:")
		b.sendMessage(msg)
		return
	}

	selectedWay := state.Ways[choice-1]
	b.mu.Lock()
	delete(b.problemStates, int64(user.ID))
	b.mu.Unlock()

	b.saveProblem(chatID, user, &services.LinkedUser{
		UserUuid: state.OwnerUuid,
		Name:     state.UserName,
	}, state.Description, selectedWay.Uuid, selectedWay.Name)
}

func (b *TelegramBot) saveProblem(chatID int64, user *tgbotapi.User, linkedUser *services.LinkedUser, description, wayUuid, wayName string) {
	waitingMsg := tgbotapi.NewMessage(chatID, "📝 Saving your problem...")
	b.sendMessage(waitingMsg)

	result, err := b.authService.CreateProblem(context.Background(), linkedUser.UserUuid, description, wayUuid)
	if err != nil {
		errorMsg := tgbotapi.NewMessage(chatID, fmt.Sprintf("Failed to log problem: %v\n\nPlease try again later.", err))
		b.sendMessage(errorMsg)
		return
	}

	successMsg := tgbotapi.NewMessage(chatID, fmt.Sprintf(`✅ Problem logged successfully!

Details:
- Description: %s
- Way: %s

We'll figure this out, %s! 💪`, result.Description, result.WayName, linkedUser.Name))
	b.sendMessage(successMsg)
}

func (b *TelegramBot) handleCommentCommand(chatID int64, text string, user *tgbotapi.User) {
	description := strings.TrimPrefix(text, "/comment")
	description = strings.TrimSpace(description)

	if description == "" {
		msg := tgbotapi.NewMessage(chatID, `Please add your comment.

Example:
/comment "Great progress today on chapter 3!"
/comment "Need to review this section again"`)
		b.sendMessage(msg)
		return
	}

	linkedUser, err := b.authService.GetLinkedUser(context.Background(), int64(user.ID))
	if err != nil {
		msg := tgbotapi.NewMessage(chatID, `❌ You need to link your account first!

Use /login to connect your Google account, then you can add comments.`)
		b.sendMessage(msg)
		return
	}

	openapi.UserToken = linkedUser.Token

	ways, err := b.authService.GetUserWays(context.Background(), linkedUser.UserUuid)
	if err != nil {
		errorMsg := tgbotapi.NewMessage(chatID, fmt.Sprintf("Failed to get your ways: %v\n\nPlease try again later.", err))
		b.sendMessage(errorMsg)
		return
	}

	if len(ways) == 0 {
		msg := tgbotapi.NewMessage(chatID, `❌ You don't have any ways yet!

Create a way in the app first, then you can add comments here.`)
		b.sendMessage(msg)
		return
	}

	if len(ways) == 1 {
		b.saveComment(chatID, user, linkedUser, description, ways[0].Uuid, ways[0].Name)
		return
	}

	b.askUserToSelectWayForComment(chatID, user, linkedUser, description, ways)
}

func (b *TelegramBot) askUserToSelectWayForComment(chatID int64, user *tgbotapi.User, linkedUser *services.LinkedUser, description string, ways []services.UserWay) {
	waysText := "Select a way for your comment:\n\n"
	for i, way := range ways {
		waysText += fmt.Sprintf("%d. %s\n", i+1, way.Name)
	}
	waysText += "\nOr type /cancel to cancel"

	msg := tgbotapi.NewMessage(chatID, waysText)
	b.sendMessage(msg)

	b.planStates[int64(user.ID)] = PlanState{
		Description: description,
		OwnerUuid:   linkedUser.UserUuid,
		UserName:    linkedUser.Name,
		Step:        "comment_select_way",
		Ways:        ways,
	}
}

func (b *TelegramBot) handleCommentWaySelection(chatID int64, text string, user *tgbotapi.User) {
	b.mu.Lock()
	state, exists := b.planStates[int64(user.ID)]
	if !exists || state.Step != "comment_select_way" {
		b.mu.Unlock()
		return
	}
	b.mu.Unlock()

	text = strings.TrimSpace(text)
	choice := 0
	_, err := fmt.Sscanf(text, "%d", &choice)
	if err != nil || choice < 1 || choice > len(state.Ways) {
		msg := tgbotapi.NewMessage(chatID, "Invalid selection. Please enter a number from the list:")
		b.sendMessage(msg)
		return
	}

	selectedWay := state.Ways[choice-1]
	b.mu.Lock()
	delete(b.planStates, int64(user.ID))
	b.mu.Unlock()

	b.saveComment(chatID, user, &services.LinkedUser{
		UserUuid: state.OwnerUuid,
		Name:     state.UserName,
	}, state.Description, selectedWay.Uuid, selectedWay.Name)
}

func (b *TelegramBot) saveComment(chatID int64, user *tgbotapi.User, linkedUser *services.LinkedUser, description, wayUuid, wayName string) {
	waitingMsg := tgbotapi.NewMessage(chatID, "📝 Saving your comment...")
	b.sendMessage(waitingMsg)

	result, err := b.authService.CreateComment(context.Background(), linkedUser.UserUuid, description, wayUuid)
	if err != nil {
		errorMsg := tgbotapi.NewMessage(chatID, fmt.Sprintf("Failed to save comment: %v\n\nPlease try again later.", err))
		b.sendMessage(errorMsg)
		return
	}

	successMsg := tgbotapi.NewMessage(chatID, fmt.Sprintf(`✅ Comment saved!

Details:
- Comment: %s
- Way: %s

Noted, %s! 📝`, result.Description, result.WayName, linkedUser.Name))
	b.sendMessage(successMsg)
}

func (b *TelegramBot) sendUnknownCommandMessage(chatID int64) {
	msg := tgbotapi.NewMessage(chatID, `I didn't understand that command.

Use /help to see available commands.`)

	b.sendMessage(msg)
}

func (b *TelegramBot) sendMessage(msg tgbotapi.MessageConfig) {
	_, err := b.bot.Send(msg)
	if err != nil {
		log.Printf("Failed to send message: %v", err)
	}
}

func (b *TelegramBot) Stop() {
	if b.isRunning {
		b.isRunning = false
		close(b.stopChan)
		time.Sleep(time.Second)
	}
}

func (b *TelegramBot) StartCronScheduler() {
	b.cron = cron.New()

	b.cron.AddFunc("0 10 * * *", func() { b.sendNotificationForTimeSlot("morning") })
	b.cron.AddFunc("0 15 * * *", func() { b.sendNotificationForTimeSlot("afternoon") })
	b.cron.AddFunc("0 18 * * *", func() { b.sendNotificationForTimeSlot("evening") })
	b.cron.AddFunc("0 21 * * *", func() { b.sendNotificationForTimeSlot("night") })

	b.cron.Start()
	log.Println("Cron scheduler started: notifications at 10:00, 15:00, 18:00, 21:00 CET")
}

func (b *TelegramBot) StopCronScheduler() {
	if b.cron != nil {
		b.cron.Stop()
		log.Println("Cron scheduler stopped")
	}
}

func (b *TelegramBot) RegisterLinkedUser(telegramID int64, user *services.LinkedUser) {
	b.mu.Lock()
	b.linkedUsers[telegramID] = user
	b.mu.Unlock()
	log.Printf("Registered linked user for telegram ID %d", telegramID)
}

func (b *TelegramBot) sendNotificationForTimeSlot(timeSlot string) {
	log.Printf("Sending notification for time slot: %s", timeSlot)

	b.mu.RLock()
	users := make([]*services.LinkedUser, 0, len(b.linkedUsers))
	for _, user := range b.linkedUsers {
		users = append(users, user)
	}
	b.mu.RUnlock()

	for _, user := range users {
		if user == nil {
			continue
		}

		openapi.UserToken = user.Token

		ways, err := b.authService.GetUserWays(context.Background(), user.UserUuid)
		if err != nil {
			log.Printf("Error getting user ways: %v", err)
			continue
		}

		hasActiveWays := false
		for _, way := range ways {
			if !way.IsCompleted {
				hasActiveWays = true
				break
			}
		}

		if !hasActiveWays {
			continue
		}

		message := b.generateFeedbackMessageForTimeSlot(timeSlot)
		b.sendMessageToUser(user, message)
	}
}

func (b *TelegramBot) generateFeedbackMessageForTimeSlot(timeSlot string) string {
	messages := map[string][]string{
		"morning": {
			"☀️ Good morning! Time to make progress on your goals!",
			"🌅 Morning is the perfect time to work on your way. Let's go!",
			"☀️ New day, new opportunities! Start making progress!",
		},
		"afternoon": {
			"🌤️ Afternoon check-in! Ready to continue your journey?",
			"💪 Keep pushing! You're doing great on your way.",
			"🌤️ Stay focused - your future self will thank you!",
		},
		"evening": {
			"🌆 Evening time! Almost done for the day. One final push?",
			"🌆 Time to wrap up today's progress. You got this!",
			"🌆 Last stretch of the day! Make it count!",
		},
		"night": {
			"🌙 Night owl mode! Still grinding? Remember to rest!",
			"🌙 Great work today! Time to rest and recharge.",
			"🌙 Another step closer to your goal today!",
		},
	}

	slotMessages := messages[timeSlot]
	if len(slotMessages) == 0 {
		return "Keep going on your way!"
	}

	idx := time.Now().Unix() % int64(len(slotMessages))
	return slotMessages[idx]
}

func (b *TelegramBot) sendMessageToUser(user *services.LinkedUser, message string) {
	telegramID := int64(0)
	b.mu.RLock()
	for id, u := range b.linkedUsers {
		if u.UserUuid == user.UserUuid {
			telegramID = id
			break
		}
	}
	b.mu.RUnlock()

	if telegramID == 0 {
		log.Printf("Could not find telegram ID for user %s", user.UserUuid)
		return
	}

	msg := tgbotapi.NewMessage(telegramID, message)
	b.sendMessage(msg)
}
