package controllers

import (
	"mwserver/internal/auth"
	"mwserver/internal/config"
	"mwserver/internal/services"
	"mwserver/pkg/util"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

type AuthController struct {
	authService *services.AuthService
	userService *services.UserService
	config      *config.Config
}

func NewAuthController(authService *services.AuthService, userService *services.UserService, config *config.Config) *AuthController {
	return &AuthController{authService, userService, config}
}

// Log in with google oAuth
// @Summary Log in with google oAuth
// @Description
// @Tags auth
// @ID google auth log in callback function
// @Accept  json
// @Produce  json
// @Param state query string true "state parameter"
// @Param provider path string true "google"
// @Success 200
// @Router /auth/{provider}/callback [post]
func (ac *AuthController) GetAuthCallbackFunction(ctx *gin.Context) {
	code := ctx.Query("code")
	state := ctx.Query("state")
	if state != auth.OauthStateString {
		ctx.JSON(http.StatusUnauthorized, gin.H{"error": "invalid oauth state"})
		return
	}

	userInfo, err := ac.authService.AuthenticateGoogleUser(ctx, code, state)
	util.HandleErrorGin(ctx, err)

	now := time.Now()
	args := &services.CreateUserParams{
		Name:        userInfo.Name,
		Email:       userInfo.Email,
		Description: "",
		CreatedAt:   now,
		ImageUrl:    userInfo.Picture,
		IsMentor:    false,
	}

	populatedUser, err := ac.userService.FindOrCreateUserByEmail(ctx, args)
	util.HandleErrorGin(ctx, err)

	jwtToken, err := auth.GenerateJWT(populatedUser.Uuid, ac.config.SecretSessionKey)
	util.HandleErrorGin(ctx, err)

	ctx.Redirect(http.StatusFound, ac.config.WebappBaseUrl+"?token="+jwtToken)
}

// Begin auth handler
// @Summary Begin oauth
// @Description
// @Tags auth
// @ID begin-auth
// @Accept  json
// @Produce  json
// @Param provider path string true "google"
// @Success 200 "ok"
// @Router /auth/{provider} [get]
func (ac *AuthController) BeginAuth(ctx *gin.Context) {
	url := ac.authService.GetGoogleAuthURL()
	ctx.Redirect(http.StatusTemporaryRedirect, url)

	ctx.JSON(http.StatusOK, "ok")
}

// @Summary Get current authorized user
// @Description
// @Tags auth
// @ID get-current-authorized-user
// @Accept  json
// @Produce  json
// @Success 200 {object} schemas.UserPopulatedResponse
// @Router /auth/current [get]
func (ac *AuthController) GetCurrentAuthorizedUserByToken(ctx *gin.Context) {
	userIDRaw, _ := ctx.Get(auth.ContextKeyUserID)
	userId := userIDRaw.(string)

	populatedUser, err := ac.userService.GetPopulatedUserById(ctx, uuid.MustParse(userId))
	util.HandleErrorGin(ctx, err)

	ctx.JSON(http.StatusOK, populatedUser)
}

// GetUserTokenByEmail handler
// @Summary login locally by email (with no oauth)
// @Description Login locally by providing an email address.
// @Tags auth
// @ID get token locally
// @Accept  json
// @Produce  json
// @Param userEmail path string true "email"
// @Success 304 "redirect"
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

	populatedUser, err := ac.userService.FindOrCreateUserByEmail(ctx, args)
	util.HandleErrorGin(ctx, err)

	jwtToken, err := auth.GenerateJWT(populatedUser.Uuid, ac.config.SecretSessionKey)
	util.HandleErrorGin(ctx, err)

	ctx.Redirect(http.StatusFound, ac.config.WebappBaseUrl+"?token="+jwtToken)
}

// @Summary Logout current authorized user
// @Description
// @Tags auth
// @ID logout-current-authorized-user
// @Accept  json
// @Produce  json
// @Param provider path string true "google"
// @Success 200 {object} util.ResponseStatusString
// @Router /auth/logout/{provider} [get]
func (ac *AuthController) Logout(ctx *gin.Context) {
	userIDRaw, _ := ctx.Get(auth.ContextKeyUserID)
	userID := userIDRaw.(string)

	ctx.JSON(http.StatusOK, gin.H{"status": "Ok" + userID})
}
