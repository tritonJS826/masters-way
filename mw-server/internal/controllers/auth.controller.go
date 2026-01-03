package controllers

import (
	"fmt"
	"mw-server/internal/auth"
	"mw-server/internal/config"
	"mw-server/internal/schemas"
	"mw-server/internal/services"
	"mw-server/pkg/util"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/jackc/pgx/v5/pgtype"
)

type AuthController struct {
	authService           *services.AuthService
	telegramService       *services.TelegramService
	userService           *services.UserService
	profileSettingService *services.ProfileSettingService
	config                *config.Config
}

func NewAuthController(authService *services.AuthService, telegramService *services.TelegramService, userService *services.UserService, profileSettingService *services.ProfileSettingService, config *config.Config) *AuthController {
	return &AuthController{authService, telegramService, userService, profileSettingService, config}
}

// Log in with google oAuth
// @Summary Log in with google oAuth
// @Description
// @Tags auth
// @ID google auth log in callback function
// @Accept  json
// @Produce  json
// @Param code query string true "code param"
// @Param state query string true "state parameter"
// @Param provider path string true "google"
// @Success 200 {object} schemas.GetAuthCallbackFunctionResponse "Redirect to frontend with JWT token"
// @Router /auth/{provider}/callback [get]
func (ac *AuthController) GetAuthCallbackFunction(ctx *gin.Context) {
	code := ctx.Query("code")
	state := ctx.Query("state")

	telegramCode, hasTelegramCode := auth.ExtractTelegramCodeFromState(state)
	isTelegramFlow := hasTelegramCode && state != auth.OauthStateString

	if !isTelegramFlow && state != auth.OauthStateString {
		ctx.JSON(http.StatusUnauthorized, gin.H{"error": "invalid oauth state"})
		return
	}

	googleAuthInfo, err := ac.authService.AuthenticateGoogleUser(ctx, code, state)
	util.HandleErrorGin(ctx, err)

	now := time.Now()
	args := &services.CreateUserParams{
		Name:        googleAuthInfo.UserInfo.Name,
		Email:       googleAuthInfo.UserInfo.Email,
		Description: "",
		CreatedAt:   now,
		ImageUrl:    googleAuthInfo.UserInfo.Picture,
		IsMentor:    false,
	}

	findOrCreateUserByEmailResponse, err := ac.userService.FindOrCreateUserByEmail(ctx, args)
	util.HandleErrorGin(ctx, err)

	ac.authService.SetGoogleTokenToTokenStore(findOrCreateUserByEmailResponse.User.Uuid, googleAuthInfo.Token)

	if isTelegramFlow && hasTelegramCode {
		err = ac.telegramService.LinkTelegramUserByAuthCode(ctx, telegramCode, uuid.MustParse(findOrCreateUserByEmailResponse.User.Uuid))
		if err != nil {
			fmt.Printf("Warning: failed to link telegram user by auth code: %v\n", err)
		}
	}

	accessToken, err := auth.GenerateJWT(findOrCreateUserByEmailResponse.User.Uuid, ac.config.SecretSessionKey, auth.AccessExpIn)
	util.HandleErrorGin(ctx, err)

	refreshToken, err := auth.GenerateJWT(findOrCreateUserByEmailResponse.User.Uuid, ac.config.SecretSessionKey, auth.RefreshExpIn)
	util.HandleErrorGin(ctx, err)

	response := schemas.GetAuthCallbackFunctionResponse{
		IsAlreadyCreated: findOrCreateUserByEmailResponse.IsAlreadyCreated,
		Url:              ac.config.WebappBaseUrl + "?accessToken=" + accessToken + "&refreshToken=" + refreshToken,
	}

	ctx.JSON(http.StatusOK, response)
}

// Begin auth handler
// @Summary Begin oauth
// @Description
// @Tags auth
// @ID begin-auth
// @Accept  json
// @Produce  json
// @Param provider path string true "google"
// @Param telegramCode query string false "telegram auth code for linking"
// @Success 200 {object} schemas.BeginAuthResponse
// @Router /auth/{provider} [get]
func (ac *AuthController) BeginAuth(ctx *gin.Context) {
	telegramCode := ctx.Query("telegramCode")
	telegramID := ctx.Query("telegramId")

	url := ac.authService.GetGoogleAuthURL()

	if telegramCode != "" && telegramID != "" {
		url = ac.authService.BuildAuthURLWithState(url, auth.BuildTelegramState(telegramCode))
	}

	response := schemas.BeginAuthResponse{
		Url: url,
	}
	ctx.JSON(http.StatusOK, response)
}

// @Summary Get current authorized user
// @Description
// @Tags auth
// @ID get-current-authorized-user
// @Accept  json
// @Produce  json
// @Success 200 {object} schemas.CurrentUserResponse
// @Router /auth/current [get]
func (ac *AuthController) GetCurrentAuthorizedUserByToken(ctx *gin.Context) {
	userIDRaw, _ := ctx.Get(auth.ContextKeyUserID)
	userId := userIDRaw.(string)

	populatedUser, err := ac.userService.GetPopulatedUserById(ctx, uuid.MustParse(userId))
	util.HandleErrorGin(ctx, err)

	profileSetting, err := ac.profileSettingService.GetProfileSettingUserId(ctx, pgtype.UUID{Bytes: uuid.MustParse(userId), Valid: true})
	util.HandleErrorGin(ctx, err)

	currentUser := schemas.CurrentUserResponse{
		ProfileSetting:     *profileSetting,
		Uuid:               populatedUser.Uuid,
		Name:               populatedUser.Name,
		Email:              populatedUser.Email,
		Description:        populatedUser.Description,
		CreatedAt:          populatedUser.CreatedAt,
		ImageUrl:           populatedUser.ImageUrl,
		IsMentor:           populatedUser.IsMentor,
		WayCollections:     populatedUser.WayCollections,
		DefaultCollections: populatedUser.DefaultCollections,
		FavoriteForUsers:   populatedUser.FavoriteForUsers,
		FavoriteUsers:      populatedUser.FavoriteUsers,
		Tags:               populatedUser.Tags,
		WayRequests:        populatedUser.WayRequests,
		Projects:           populatedUser.Projects,
		UserContacts:       populatedUser.UserContacts,
	}

	ctx.JSON(http.StatusOK, currentUser)
}

// GetUserTokenByEmail handler
// @Summary login locally by email (with no oauth)
// @Description Login locally by providing an email address.
// @Tags auth
// @ID get token locally
// @Accept  json
// @Produce  json
// @Param userEmail path string true "email"
// @Success 200 {object} schemas.GetAuthCallbackFunctionResponse
// @Router /auth/login/local/{userEmail} [get]
func (ac *AuthController) GetUserTokenByEmail(ctx *gin.Context) {
	userEmail := ctx.Param("userEmail")

	now := time.Now()
	args := &services.CreateUserParams{
		Name:        userEmail,
		Email:       userEmail,
		Description: "",
		CreatedAt:   now,
		ImageUrl:    "",
		IsMentor:    false,
	}

	findOrCreateUserByEmailResponse, err := ac.userService.FindOrCreateUserByEmail(ctx, args)
	util.HandleErrorGin(ctx, err)

	accessToken, err := auth.GenerateJWT(findOrCreateUserByEmailResponse.User.Uuid, ac.config.SecretSessionKey, auth.AccessExpIn)
	util.HandleErrorGin(ctx, err)

	refreshToken, err := auth.GenerateJWT(findOrCreateUserByEmailResponse.User.Uuid, ac.config.SecretSessionKey, auth.RefreshExpIn)
	util.HandleErrorGin(ctx, err)

	response := schemas.GetAuthCallbackFunctionResponse{
		IsAlreadyCreated: findOrCreateUserByEmailResponse.IsAlreadyCreated,
		Url:              ac.config.WebappBaseUrl + "?accessToken=" + accessToken + "&refreshToken=" + refreshToken,
	}

	ctx.JSON(http.StatusOK, response)
}

// @Summary Logout current authorized user
// @Description
// @Tags auth
// @ID logout-current-authorized-user
// @Accept  json
// @Produce  json
// @Param provider path string true "google"
// @Success 204
// @Router /auth/logout/{provider} [get]
func (ac *AuthController) Logout(ctx *gin.Context) {
	userIDRaw, _ := ctx.Get(auth.ContextKeyUserID)
	fmt.Println(userIDRaw.(string))

	ctx.Status(http.StatusNoContent)
}

// @Summary Retrieve Google Access Token
// @Description This endpoint retrieves the Google access token for an authenticated user.
// @Tags auth
// @ID get-google-token
// @Accept json
// @Produce json
// @Success 200 {object} schemas.GoogleToken
// @Router /auth/google-token [get]
func (ac *AuthController) GetGoogleAccessToken(ctx *gin.Context) {
	userIDRaw, _ := ctx.Get(auth.ContextKeyUserID)
	userID := userIDRaw.(string)

	token, err := ac.authService.GetGoogleToken(userID)
	util.HandleErrorGin(ctx, err)

	response := schemas.GoogleToken{
		AccessToken: token.AccessToken,
	}

	ctx.JSON(http.StatusOK, response)
}

// @Summary Retrieve Access Token
// @Description
// @Tags auth
// @ID refresh-access-token
// @Accept json
// @Produce json
// @Param request body schemas.RefreshAccessTokenPayload true "query params"
// @Success 200 {object} schemas.RefreshAccessTokenResponse
// @Router /auth/refreshToken [post]
func (ac *AuthController) RefreshAccessToken(ctx *gin.Context) {
	var payload *schemas.RefreshAccessTokenPayload

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "Failed payload", "error": err.Error()})
		return
	}

	claims, err := auth.ValidateJWT(payload.RefreshToken, ac.config.SecretSessionKey)
	util.HandleErrorGin(ctx, err)

	newGoogleToken, err := ac.authService.RefreshGoogleAccessToken(ctx, claims.UserID)
	ac.authService.SetGoogleTokenToTokenStore(claims.UserID, newGoogleToken)

	accessToken, err := auth.GenerateJWT(claims.UserID, ac.config.SecretSessionKey, auth.AccessExpIn)
	util.HandleErrorGin(ctx, err)

	response := schemas.RefreshAccessTokenResponse{
		AccessToken: accessToken,
	}

	ctx.JSON(http.StatusOK, response)
}

type InitiateTelegramLoginRequest struct {
	TelegramID   int64  `json:"telegramId" binding:"required"`
	TelegramName string `json:"telegramName"`
}

type InitiateTelegramLoginResponse struct {
	AuthURL string `json:"authUrl"`
	Code    string `json:"code"`
}

// InitiateTelegramLogin creates a pending Telegram linking record and returns Google Auth URL
// @Summary Initiate Telegram login
// @Description Creates a pending Telegram linking record and returns Google Auth URL with code
// @Tags auth
// @ID initiate-telegram-login
// @Accept json
// @Produce json
// @Param request body InitiateTelegramLoginRequest true "Telegram login request"
// @Success 200 {object} InitiateTelegramLoginResponse
// @Router /auth/telegram/initiate [post]
func (ac *AuthController) InitiateTelegramLogin(ctx *gin.Context) {
	var req InitiateTelegramLoginRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "invalid request", "message": err.Error()})
		return
	}

	fmt.Printf("InitiateTelegramLogin: telegramId=%d, telegramName=%s\n", req.TelegramID, req.TelegramName)

	telegramCode := fmt.Sprintf("TG%d_%s", req.TelegramID, randomString(12))
	fmt.Printf("Generated code: %s\n", telegramCode)

	_, err := ac.telegramService.CreatePendingTelegramUser(ctx, req.TelegramID, req.TelegramName, telegramCode, 10*time.Minute)
	if err != nil {
		fmt.Printf("Error creating pending telegram user: %v\n", err)
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "failed to create pending telegram user", "message": err.Error()})
		return
	}

	authURL := ac.authService.GetGoogleAuthURL()
	authURLWithState := ac.authService.BuildAuthURLWithState(authURL, auth.BuildTelegramState(telegramCode))

	fmt.Printf("Auth URL with state: %s\n", authURLWithState)

	ctx.JSON(http.StatusOK, InitiateTelegramLoginResponse{
		AuthURL: authURLWithState,
		Code:    telegramCode,
	})
}

type ValidateTelegramLoginRequest struct {
	Code       string `json:"code" binding:"required"`
	TelegramID int64  `json:"telegramId" binding:"required"`
}

type ValidateTelegramLoginResponse struct {
	UserUuid string `json:"userUuid"`
	Email    string `json:"email"`
	Name     string `json:"name"`
}

// ValidateTelegramLogin validates the code and returns linked user info
// @Summary Validate Telegram login
// @Description Validates the Telegram linking code and returns user info
// @Tags auth
// @ID validate-telegram-login
// @Accept json
// @Produce json
// @Param request body ValidateTelegramLoginRequest true "Telegram validation request"
// @Success 200 {object} ValidateTelegramLoginResponse
// @Router /auth/telegram/validate [post]
func (ac *AuthController) ValidateTelegramLogin(ctx *gin.Context) {
	var req ValidateTelegramLoginRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "invalid request", "message": err.Error()})
		return
	}

	pendingUser, err := ac.telegramService.GetPendingTelegramUserByAuthCode(ctx, req.Code)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "invalid or expired code", "message": err.Error()})
		return
	}

	if pendingUser.TelegramID != req.TelegramID {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "code mismatch: telegram ID does not match"})
		return
	}

	linkedUser, err := ac.telegramService.GetLinkedUserByTelegramId(ctx, req.TelegramID)
	if err != nil || !linkedUser.UserUuid.Valid {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "account not linked yet", "message": "Please complete Google authentication first"})
		return
	}

	response := ValidateTelegramLoginResponse{
		UserUuid: uuid.UUID(linkedUser.UserUuid.Bytes).String(),
		Email:    linkedUser.Email.String,
		Name:     linkedUser.UserName.String,
	}

	ctx.JSON(http.StatusOK, response)
}

type LinkTelegramRequest struct {
	TelegramID int64  `json:"telegramId" binding:"required"`
	AuthCode   string `json:"authCode" binding:"required"`
}

// LinkTelegram links a Telegram account to the current user
// @Summary Link Telegram account
// @Description Links a Telegram account to the user using an auth code
// @Tags auth
// @ID link-telegram
// @Accept json
// @Produce json
// @Param request body LinkTelegramRequest true "Telegram linking request"
// @Success 200 {object} map[string]string "Success message"
// @Router /auth/telegram/link [post]
func (ac *AuthController) LinkTelegram(ctx *gin.Context) {
	var req LinkTelegramRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "invalid request", "message": err.Error()})
		return
	}

	err := ac.telegramService.LinkTelegramUser(ctx, req.TelegramID, req.AuthCode, "")
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "failed to link telegram", "message": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"status": "success", "message": "Telegram account linked successfully"})
}

// UnlinkTelegram removes the Telegram account linking
// @Summary Unlink Telegram account
// @Description Removes the Telegram account linking from the database
// @Tags auth
// @ID unlink-telegram
// @Accept json
// @Produce json
// @Param telegramId path int64 true "Telegram ID"
// @Success 200 {object} map[string]string "Success message"
// @Router /auth/telegram/unlink/{telegramId} [delete]
func (ac *AuthController) UnlinkTelegram(ctx *gin.Context) {
	telegramID := ctx.Param("telegramId")
	if telegramID == "" {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "telegram ID is required"})
		return
	}

	var tgID int64
	_, err := fmt.Sscanf(telegramID, "%d", &tgID)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "invalid telegram ID"})
		return
	}

	err = ac.telegramService.UnlinkTelegramUser(ctx, tgID)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "failed to unlink telegram", "message": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"status": "success", "message": "Telegram account unlinked successfully"})
}

func randomString(length int) string {
	const letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
	b := make([]byte, length)
	for i := range b {
		b[i] = letters[time.Now().UnixNano()%int64(len(letters))]
	}
	return string(b)
}

type TestTelegramLinkRequest struct {
	Email    string `json:"email" binding:"required"`
	AuthCode string `json:"authCode" binding:"required"`
}

type TestTelegramLinkResponse struct {
	AccessToken  string `json:"accessToken"`
	RefreshToken string `json:"refreshToken"`
	UserUuid     string `json:"userUuid"`
	Email        string `json:"email"`
	Name         string `json:"name"`
}

// TestTelegramLink simulates Google OAuth callback for local testing
// @Summary Test Telegram link (local only)
// @Description Creates a user by email and links it to the Telegram user by auth code
// @Tags auth
// @ID test-telegram-link
// @Accept json
// @Produce json
// @Param email query string true "User email"
// @Param authCode query string true "Telegram auth code"
// @Success 200 {object} TestTelegramLinkResponse
// @Router /auth/telegram/test-link [get]
func (ac *AuthController) TestTelegramLink(ctx *gin.Context) {
	email := ctx.Query("email")
	authCode := ctx.Query("authCode")

	if email == "" || authCode == "" {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "email and authCode are required"})
		return
	}

	now := time.Now()
	args := &services.CreateUserParams{
		Name:        email,
		Email:       email,
		Description: "",
		CreatedAt:   now,
		ImageUrl:    "",
		IsMentor:    false,
	}

	findOrCreateUserByEmailResponse, err := ac.userService.FindOrCreateUserByEmail(ctx, args)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "failed to create user", "message": err.Error()})
		return
	}

	err = ac.telegramService.LinkTelegramUserByAuthCode(ctx, authCode, uuid.MustParse(findOrCreateUserByEmailResponse.User.Uuid))
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "failed to link telegram", "message": err.Error()})
		return
	}

	accessToken, err := auth.GenerateJWT(findOrCreateUserByEmailResponse.User.Uuid, ac.config.SecretSessionKey, auth.AccessExpIn)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "failed to generate token", "message": err.Error()})
		return
	}

	refreshToken, err := auth.GenerateJWT(findOrCreateUserByEmailResponse.User.Uuid, ac.config.SecretSessionKey, auth.RefreshExpIn)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "failed to generate token", "message": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, TestTelegramLinkResponse{
		AccessToken:  accessToken,
		RefreshToken: refreshToken,
		UserUuid:     findOrCreateUserByEmailResponse.User.Uuid,
		Email:        findOrCreateUserByEmailResponse.User.Email,
		Name:         findOrCreateUserByEmailResponse.User.Name,
	})
}
