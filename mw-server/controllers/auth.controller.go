package controllers

import (
	"context"
	"database/sql"
	"fmt"
	"net/http"
	"time"

	"mwserver/auth"
	"mwserver/config"
	db "mwserver/db/sqlc"
	"mwserver/services"
	"mwserver/util"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/markbates/goth/gothic"
)

type AuthController struct {
	db  *db.Queries
	ctx context.Context
}

func NewAuthController(db *db.Queries, ctx context.Context) *AuthController {
	return &AuthController{db, ctx}
}

// Log in with google oAuth ()
// @Summary Log in with google oAuth
// @Description
// @Tags auth
// @ID google auth log in
// @Accept  json
// @Produce  json
// @Param request body schemas.CreateCommentPayload true "query params"
// @Param provider path string true "google"
// @Success 200 {object} schemas.CommentPopulatedResponse
// @Router /auth/{provider}/callback [post]
func (cc *AuthController) GetAuthCallbackFunction(ctx *gin.Context) {
	provider := ctx.Param("provider")
	ctx.Request = ctx.Request.WithContext(context.WithValue(context.Background(), "provider", provider))

	gothUser, err := gothic.CompleteUserAuth(ctx.Writer, ctx.Request)
	util.HandleErrorGin(ctx, err)

	now := time.Now()
	args := &db.CreateUserParams{
		Name:        gothUser.Name,
		Email:       gothUser.Email,
		Description: gothUser.Description,
		CreatedAt:   now,
		ImageUrl:    sql.NullString{String: gothUser.AvatarURL, Valid: true},
		IsMentor:    false,
		FirebaseID:  "",
	}

	populatedUser, err := services.FindOrCreateUserByEmail(cc.db, ctx, args)
	util.HandleErrorGin(ctx, err)

	// Save user data in the session
	session, err := gothic.Store.Get(ctx.Request, auth.AuthSession)
	util.HandleErrorGin(ctx, err)

	session.Values[auth.UserIdKey] = populatedUser.Uuid
	err = session.Save(ctx.Request, ctx.Writer)
	util.HandleErrorGin(ctx, err)

	fmt.Println(session.Values)
	cookies := ctx.Request.Cookies()
	fmt.Print(cookies)

	ctx.Redirect(http.StatusFound, config.Env.WebappBaseUrl)
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
	provider := ctx.Param("provider")
	ctx.Request = ctx.Request.WithContext(context.WithValue(context.Background(), "provider", provider))

	if gothUser, err := gothic.CompleteUserAuth(ctx.Writer, ctx.Request); err == nil {
		fmt.Println("Already logged user")

		now := time.Now()
		args := &db.CreateUserParams{
			Name:        gothUser.Name,
			Email:       gothUser.Email,
			Description: gothUser.Description,
			CreatedAt:   now,
			ImageUrl:    sql.NullString{String: gothUser.AvatarURL, Valid: true},
			IsMentor:    false,
			FirebaseID:  "",
		}
		populatedUser, err := services.FindOrCreateUserByEmail(cc.db, ctx, args)
		util.HandleErrorGin(ctx, err)
		ctx.JSON(http.StatusOK, populatedUser)
	} else {
		fmt.Println("Begin auth handler")
		gothic.BeginAuthHandler(ctx.Writer, ctx.Request)
	}
}

// @Summary Get current authorized user
// @Description
// @Tags auth
// @ID get-current-authorized-user
// @Accept  json
// @Produce  json
// @Success 200 {object} schemas.UserPopulatedResponse
// @Router /auth/current [get]
func (cc *AuthController) GetCurrentAuthorizedUser(ctx *gin.Context) {
	cookies := ctx.Request.Cookies()
	fmt.Print(cookies)

	session, err := gothic.Store.Get(ctx.Request, auth.AuthSession)
	util.HandleErrorGin(ctx, err)

	userID, ok := session.Values[auth.UserIdKey].(string)
	fmt.Println(session.Values)
	if !ok {
		ctx.JSON(http.StatusUnauthorized, gin.H{"error": "User not authenticated"})
		return
	}

	populatedUser, err := services.GetPopulatedUserById(cc.db, ctx, uuid.MustParse(userID))
	util.HandleErrorGin(ctx, err)

	ctx.JSON(http.StatusOK, populatedUser)
}
