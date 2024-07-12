package controllers

import (
	"context"
	"mwserver/auth"
	"mwserver/config"
	dbPGX "mwserver/db_pgx/sqlc"
	"mwserver/services"
	"mwserver/util"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/jackc/pgx/v5/pgtype"
	"golang.org/x/oauth2"
	oauthGoogle "google.golang.org/api/oauth2/v2"
	"google.golang.org/api/option"
)

type AuthController struct {
	dbPGX *dbPGX.Queries
	ctx   context.Context
}

func NewAuthController(dbPGX *dbPGX.Queries, ctx context.Context) *AuthController {
	return &AuthController{dbPGX, ctx}
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
func (cc *AuthController) GetAuthCallbackFunction(ctx *gin.Context) {
	state := ctx.Query("state")
	if state != auth.OauthStateString {
		ctx.JSON(http.StatusUnauthorized, gin.H{"error": "invalid oauth state"})
		return
	}

	code := ctx.Query("code")
	token, err := auth.GoogleOAuthConfig.Exchange(ctx, code)
	util.HandleErrorGin(ctx, err)

	client := auth.GoogleOAuthConfig.Client(ctx, token)
	oauth2Service, err := oauthGoogle.NewService(ctx, option.WithHTTPClient(client))
	util.HandleErrorGin(ctx, err)

	userInfo, err := oauth2Service.Userinfo.Get().Do()
	util.HandleErrorGin(ctx, err)

	now := time.Now()
	args := &dbPGX.CreateUserParams{
		Name:        userInfo.Name,
		Email:       userInfo.Email,
		Description: "",
		CreatedAt:   pgtype.Timestamp{Time: now, Valid: true},
		ImageUrl:    userInfo.Picture,
		IsMentor:    false,
	}

	populatedUser, err := services.FindOrCreateUserByEmail(cc.dbPGX, ctx, args)
	util.HandleErrorGin(ctx, err)

	jwtToken, err := auth.GenerateJWT(populatedUser.Uuid)
	util.HandleErrorGin(ctx, err)

	ctx.Redirect(http.StatusFound, config.Env.WebappBaseUrl+"?token="+jwtToken)
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
func (cc *AuthController) BeginAuth(ctx *gin.Context) {
	url := auth.GoogleOAuthConfig.AuthCodeURL(auth.OauthStateString, oauth2.AccessTypeOffline)
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
func (cc *AuthController) GetCurrentAuthorizedUserByToken(ctx *gin.Context) {
	userIDRaw, _ := ctx.Get(auth.ContextKeyUserID)
	userId := userIDRaw.(string)

	populatedUser, err := services.GetPopulatedUserById(cc.dbPGX, ctx, uuid.MustParse(userId))
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
func (cc *AuthController) GetUserTokenByEmail(ctx *gin.Context) {
	userEmail := ctx.Param("userEmail")

	now := time.Now()
	args := &dbPGX.CreateUserParams{
		Name:        userEmail,
		Email:       userEmail,
		Description: "",
		CreatedAt:   pgtype.Timestamp{Time: now, Valid: true},
		ImageUrl:    "",
		IsMentor:    false,
	}

	populatedUser, err := services.FindOrCreateUserByEmail(cc.dbPGX, ctx, args)
	util.HandleErrorGin(ctx, err)

	jwtToken, err := auth.GenerateJWT(populatedUser.Uuid)
	util.HandleErrorGin(ctx, err)

	ctx.Redirect(http.StatusFound, config.Env.WebappBaseUrl+"?token="+jwtToken)
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
func (cc *AuthController) Logout(ctx *gin.Context) {
	userIDRaw, _ := ctx.Get(auth.ContextKeyUserID)
	userId := userIDRaw.(string)

	ctx.JSON(http.StatusOK, gin.H{"status": "Ok" + userId})
}
