package controllers

import (
	"context"
	"fmt"
	"net/http"

	db "mwserver/db/sqlc"
	"mwserver/util"

	"github.com/gin-gonic/gin"
	"github.com/markbates/goth/gothic"
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
// @Tags auth google
// @ID google auth log in
// @Accept  json
// @Produce  json
// @Param request body schemas.CreateCommentPayload true "query params"
// @Success 200 {object} schemas.CommentPopulatedResponse
// @Router /auth/{provider}/callback [post]
func (cc *AuthController) GetAuthCallbackFunction(ctx *gin.Context) {
	provider := ctx.Param("provider")
	ctx.Request = ctx.Request.WithContext(context.WithValue(context.Background(), "provider", provider))

	googleUser, err := gothic.CompleteUserAuth(ctx.Writer, ctx.Request)

	if err != nil {
		fmt.Fprintln(ctx.Writer, err)
		util.HandleErrorGin(ctx, err)
		return
	}

	fmt.Println(googleUser)

	ctx.JSON(http.StatusOK, googleUser)
}

// Update comment handler
// @Summary Update comment by UUID
// @Description
// @Tags comment
// @ID update-comment
// @Accept  json
// @Produce  json
// @Param request body schemas.UpdateCommentPayload true "query params"
// @Param commentId path string true "comment ID"
// @Success 200 {object} schemas.CommentPopulatedResponse
// @Router /comments/{provider} [patch]
func (cc *AuthController) BeginAuth(ctx *gin.Context) {
	provider := ctx.Param("provider")

	ctx.Request = ctx.Request.WithContext(context.WithValue(context.Background(), "provider", provider))

	gothic.BeginAuthHandler(ctx.Writer, ctx.Request)
	// if err := ctx.ShouldBindJSON(&payload); err != nil {
	// 	ctx.JSON(http.StatusBadRequest, gin.H{"status": "Failed payload", "error": err.Error()})
	// 	return
	// }

	// ctx.JSON(http.StatusOK, comment)
}

// Deleting Comment handlers
// @Summary Delete comment by UUID
// @Description
// @Tags comment
// @ID delete-comment
// @Accept  json
// @Produce  json
// @Param commentId path string true "comment ID"
// @Success 200
// @Router /comments/{commentId} [delete]
// func (cc *CommentController) DeleteCommentById(ctx *gin.Context) {
// 	commentId := ctx.Param("commentId")

// 	err := cc.db.DeleteComment(ctx, uuid.MustParse(commentId))
// 	util.HandleErrorGin(ctx, err)

// 	ctx.JSON(http.StatusNoContent, gin.H{"status": "successfully deleted"})

// }
