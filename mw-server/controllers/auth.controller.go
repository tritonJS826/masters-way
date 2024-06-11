package controllers

import (
	"context"
	"net/http"
	"time"

	"mwserver/auth"
	"mwserver/config"
	db "mwserver/db/sqlc"
	"mwserver/services"
	"mwserver/util"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"golang.org/x/oauth2"
	oauthGoogle "google.golang.org/api/oauth2/v2"
	"google.golang.org/api/option"
)

type AuthController struct {
	db  *db.Queries
	ctx context.Context
}

func NewAuthController(db *db.Queries, ctx context.Context) *AuthController {
	return &AuthController{db, ctx}
}

// Log in with google oAuth
// @Summary Log in with google oAuth
// @Description
// @Tags auth
// @ID google auth log in
// @Accept  json
// @Produce  json
// @Param request body schemas.CreateCommentPayload true "query params"
// @Param state query string true "state parameter"
// @Param provider path string true "google"
// @Success 200 {object} schemas.CommentPopulatedResponse
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
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "could not create oauth2 service"})
		return
	}

	userInfo, err := oauth2Service.Userinfo.Get().Do()
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "could not get user info"})
		return
	}

	now := time.Now()
	args := &db.CreateUserParams{
		Name:        userInfo.Name,
		Email:       userInfo.Email,
		Description: "",
		CreatedAt:   now,
		ImageUrl:    userInfo.Picture,
		IsMentor:    false,
		FirebaseID:  "",
	}

	populatedUser, err := services.FindOrCreateUserByEmail(cc.db, ctx, args)
	util.HandleErrorGin(ctx, err)

	jwtToken, err := auth.GenerateJWT(populatedUser.Uuid)
	util.HandleErrorGin(ctx, err)

	ctx.Redirect(http.StatusFound, config.Env.WebappBaseUrl+"?token="+jwtToken)
}

// Begin auth handler
// @Summary Update comment by UUID
// @Description
// @Tags auth
// @ID begin-auth
// @Accept  json
// @Produce  json
// @Param provider path string true "google"
// @Success 200 {object} schemas.UserPopulatedResponse
// @Router /auth/{provider} [get]
func (cc *AuthController) BeginAuth(ctx *gin.Context) {
	url := auth.GoogleOAuthConfig.AuthCodeURL(auth.OauthStateString, oauth2.AccessTypeOffline)
	ctx.Redirect(http.StatusTemporaryRedirect, url)
}

// @Summary Get current authorized user
// @Description
// @Tags auth
// @ID get-current-authorized-user
// @Accept  json
// @Produce  json
// @Param token query string true "token"
// @Success 200 {object} schemas.UserPopulatedResponse
// @Router /auth/current [get]
func (cc *AuthController) GetCurrentAuthorizedUser(ctx *gin.Context) {
	jwtToken := ctx.Query("token")
	claims, err := auth.ValidateJWT(jwtToken)
	util.HandleErrorGin(ctx, err)

	populatedUser, err := services.GetPopulatedUserById(cc.db, ctx, uuid.MustParse(claims.UserID))
	if err != nil {
		util.HandleErrorGin(ctx, err)
		return
	}

	ctx.SetSameSite(http.SameSiteNoneMode)
	ctx.SetCookie(auth.AccessToken, jwtToken, auth.MaxAge, "/", config.Env.Domain, true, true)
	ctx.SetCookie(auth.AuthStatePublic, "1", auth.MaxAge, "/", config.Env.Domain, true, false)
	ctx.JSON(http.StatusOK, populatedUser)
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
	jwtToken, err := ctx.Cookie(auth.AccessToken)
	util.HandleErrorGin(ctx, err)
	_, err = auth.ValidateJWT(jwtToken)
	util.HandleErrorGin(ctx, err)

	ctx.SetSameSite(http.SameSiteNoneMode)
	ctx.SetCookie(auth.AccessToken, "", -1, "/", config.Env.Domain, true, false)
	ctx.SetCookie(auth.AuthStatePublic, "", -1, "/", config.Env.Domain, true, false)
	ctx.JSON(http.StatusOK, gin.H{"status": "Ok"})
}
