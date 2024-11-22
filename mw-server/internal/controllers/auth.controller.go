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
// @Param code query string true "code param"
// @Param state query string true "state parameter"
// @Param provider path string true "google"
// @Success 200 {object} schemas.GetAuthCallbackFunctionResponse "Redirect to frontend with JWT token"
// @Router /auth/{provider}/callback [get]
func (ac *AuthController) GetAuthCallbackFunction(ctx *gin.Context) {
	code := ctx.Query("code")
	state := ctx.Query("state")
	if state != auth.OauthStateString {
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

	ac.authService.SetGoogleAccessTokenByUserID(findOrCreateUserByEmailResponse.User.Uuid, googleAuthInfo.Token.AccessToken)

	jwtToken, err := auth.GenerateJWT(findOrCreateUserByEmailResponse.User.Uuid, ac.config.SecretSessionKey)
	util.HandleErrorGin(ctx, err)

	response := schemas.GetAuthCallbackFunctionResponse{
		IsAlreadyCreated: findOrCreateUserByEmailResponse.IsAlreadyCreated,
		Url:              ac.config.WebappBaseUrl + "?token=" + jwtToken,
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
// @Success 200 {object} schemas.BeginAuthResponse
// @Router /auth/{provider} [get]
func (ac *AuthController) BeginAuth(ctx *gin.Context) {
	url := ac.authService.GetGoogleAuthURL()
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

	jwtToken, err := auth.GenerateJWT(findOrCreateUserByEmailResponse.User.Uuid, ac.config.SecretSessionKey)
	util.HandleErrorGin(ctx, err)

	response := schemas.GetAuthCallbackFunctionResponse{
		IsAlreadyCreated: findOrCreateUserByEmailResponse.IsAlreadyCreated,
		Url:              ac.config.WebappBaseUrl + "?token=" + jwtToken,
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

	token, err := ac.authService.GetGoogleAccessTokenByUserID(userID)
	util.HandleErrorGin(ctx, err)

	response := schemas.GoogleToken{
		AccessToken: token,
	}

	ctx.JSON(http.StatusOK, response)
}
