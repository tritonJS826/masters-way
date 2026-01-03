package bot

import (
	"fmt"
	"log"
	"mw-telegram-bot/internal/client"
	"mw-telegram-bot/internal/config"
	"net/http"
	"strings"
	"time"

	"github.com/go-telegram-bot-api/telegram-bot-api"
)

type TelegramBot struct {
	config    *config.Config
	client    *client.GeneralBFFClient
	bot       *tgbotapi.BotAPI
	stopChan  chan struct{}
	isRunning bool
}

func NewTelegramBot(cfg *config.Config, bffClient *client.GeneralBFFClient) (*TelegramBot, error) {
	bot, err := tgbotapi.NewBotAPI(cfg.TelegramBotToken)
	if err != nil {
		return nil, fmt.Errorf("failed to create bot: %w", err)
	}

	log.Printf("Authorized on account %s", bot.Self.UserName)

	return &TelegramBot{
		config:   cfg,
		client:   bffClient,
		bot:      bot,
		stopChan: make(chan struct{}),
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
	case strings.HasPrefix(text, "/status"):
		b.sendStatusMessage(chatID, user)
	case strings.HasPrefix(text, "/logout"):
		b.handleLogoutCommand(chatID, user)
	default:
		b.sendUnknownCommandMessage(chatID)
	}
}

func (b *TelegramBot) sendStartMessage(chatID int64) {
	msg := tgbotapi.NewMessage(chatID, "Welcome to Masters Way Bot!\n\nHere are available commands:\n/login - Link your Google account\n/jobdone <description> - Log your completed work\n/help - Show this help message\n/status - Check bot status\n\nUse /login first to connect your account!")

	b.sendMessage(msg)
}

func (b *TelegramBot) sendHelpMessage(chatID int64) {
	msg := tgbotapi.NewMessage(chatID, `Masters Way Bot Help

Available commands:
/start - Get started with the bot
/login - Link your Google account to use the bot
/logout - Unlink your account
/jobdone <description> - Log your completed work
/status - Check bot status
/help - Show this help message

How to use:
1. Run /login to get an authentication link
2. Click the link and sign in with Google
3. Enter the code shown in Telegram
4. Now you can log your progress!

Example:
/jobdone "Studied 2 hours of Go programming"`)

	b.sendMessage(msg)
}

func (b *TelegramBot) sendStatusMessage(chatID int64, user *tgbotapi.User) {
	storedUser, err := b.client.GetUserByTelegramId(int64(user.ID))

	var statusMsg string
	if err != nil {
		statusMsg = "📋 Bot Status:\n- Connected to API: ✅\n- Your account: ❌ Not linked\n\nUse /login to link your Google account!"
	} else {
		statusMsg = fmt.Sprintf("📋 Bot Status:\n- Connected to API: ✅\n- Linked account: ✅ %s\n- Email: %s", storedUser.Name, storedUser.Email)
	}

	fullMsg := fmt.Sprintf("%s\n\nEnvironment: %s\nMode: %s", statusMsg, b.config.EnvType, b.config.TelegramBotMode)

	msg := tgbotapi.NewMessage(chatID, fullMsg)
	b.sendMessage(msg)
}

func (b *TelegramBot) handleLoginCommand(chatID int64, user *tgbotapi.User) {
	log.Printf("handleLoginCommand called for user ID: %d, username: %s", user.ID, user.UserName)

	tgName := user.UserName

	authURL, code, err := b.client.InitiateTelegramLogin(int64(user.ID), tgName)
	if err != nil {
		log.Printf("Error in InitiateTelegramLogin: %v", err)
		errorMsg := tgbotapi.NewMessage(chatID, fmt.Sprintf("❌ Failed to initiate login: %v\n\nPlease try again.", err))
		b.sendMessage(errorMsg)
		return
	}

	log.Printf("Login initiated successfully. Code: %s, URL length: %d", code, len(authURL))

	msg := tgbotapi.NewMessage(chatID, fmt.Sprintf(`🔐 To link your Google account:

1. Click the link below to sign in with Google:
%s

2. After signing in, you'll receive a confirmation
3. Enter this code in Telegram: /link %s

Note: The code expires in 10 minutes.`, authURL, code))

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

	waitingMsg := tgbotapi.NewMessage(chatID, "🔄 Validating your code...")
	b.sendMessage(waitingMsg)

	result, err := b.client.ValidateTelegramCode(code, int64(user.ID), user.UserName)
	if err != nil {
		errorMsg := tgbotapi.NewMessage(chatID, fmt.Sprintf("❌ Validation failed: %v\n\nPlease try /login again to get a new code.", err))
		b.sendMessage(errorMsg)
		return
	}

	successMsg := tgbotapi.NewMessage(chatID, fmt.Sprintf(`✅ Successfully linked!

Welcome, %s!
Your account (%s) is now connected. You can now use /jobdone to log your progress.`, result.Name, result.Email))

	b.sendMessage(successMsg)
}

func (b *TelegramBot) handleLogoutCommand(chatID int64, user *tgbotapi.User) {
	err := b.client.UnlinkUser(int64(user.ID))
	if err != nil {
		msg := tgbotapi.NewMessage(chatID, fmt.Sprintf("❌ Failed to unlink account: %v\n\nYou may not be linked yet.", err))
		b.sendMessage(msg)
		return
	}

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

	storedUser, err := b.client.GetUserByTelegramId(int64(user.ID))
	if err != nil {
		msg := tgbotapi.NewMessage(chatID, `❌ You need to link your account first!

Use /login to connect your Google account, then you can log your progress.`)

		b.sendMessage(msg)
		return
	}

	waitingMsg := tgbotapi.NewMessage(chatID, "📝 Logging your progress...")
	b.sendMessage(waitingMsg)

	timeSpent := b.estimateTimeFromDescription(description)

	result, err := b.client.CreateJobDone(int64(user.ID), description, timeSpent)
	if err != nil {
		errorMsg := tgbotapi.NewMessage(chatID, fmt.Sprintf("Failed to log your progress: %v\n\nPlease try again later.", err))
		b.sendMessage(errorMsg)
		return
	}

	successMsg := tgbotapi.NewMessage(chatID, fmt.Sprintf(`✅ Job logged successfully!

Details:
- Description: %s
- Time estimated: %d minutes
- Way: %s

Great job on your progress, %s! 🎉`, result.Description, result.Time, result.WayName, storedUser.Name))

	b.sendMessage(successMsg)
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
