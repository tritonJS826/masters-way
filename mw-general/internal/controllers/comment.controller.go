package controllers

import (
	"net/http"

	"mwgeneral/internal/auth"
	"mwgeneral/internal/schemas"
	"mwgeneral/internal/services"
	"mwgeneral/pkg/util"

	"github.com/gin-gonic/gin"
)

type CommentController struct {
	permissionService *services.PermissionService
	commentService    *services.CommentService
}

func NewCommentController(permissionService *services.PermissionService, commentService *services.CommentService) *CommentController {
	return &CommentController{permissionService, commentService}
}

// Create Comment  handler
// @Summary Create a new comment
// @Description
// @Tags comment
// @ID create-comment
// @Accept  json
// @Produce  json
// @Param request body schemas.CreateCommentPayload true "query params"
// @Success 200 {object} schemas.CommentPopulatedResponse
// @Failure 403 {object} customErrors.NoRightToChangeDayReportError "User doesn't have rights to create comment."
// @Router /comments [post]
func (cc *CommentController) CreateComment(ctx *gin.Context) {
	var payload *schemas.CreateCommentPayload

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "Failed payload", "error": err.Error()})
		return
	}

	userIDRaw, _ := ctx.Get(auth.ContextKeyUserID)
	userID := userIDRaw.(string)

	err := cc.permissionService.CheckIsUserHavingPermissionsForDayReport(ctx, userID, payload.DayReportUuid)
	util.HandleErrorGin(ctx, err)

	response, err := cc.commentService.CreateComment(ctx, payload)
	util.HandleErrorGin(ctx, err)

	ctx.JSON(http.StatusOK, response)
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
// @Failure 403 {object} customErrors.NoRightToChangeDayReportError "User doesn't have rights to update comment."
// @Router /comments/{commentId} [patch]
func (cc *CommentController) UpdateComment(ctx *gin.Context) {
	var payload *schemas.UpdateCommentPayload
	commentID := ctx.Param("commentId")

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "Failed payload", "error": err.Error()})
		return
	}

	userIDRaw, _ := ctx.Get(auth.ContextKeyUserID)
	userID := userIDRaw.(string)

	err := cc.permissionService.CheckIsUserHavingPermissionsForComment(ctx, userID, commentID)
	util.HandleErrorGin(ctx, err)

	response, err := cc.commentService.UpdateComment(ctx, &services.UpdateCommentParams{
		CommentID:   commentID,
		Description: payload.Description,
	})
	util.HandleErrorGin(ctx, err)

	ctx.JSON(http.StatusOK, response)
}

// Deleting Comment handlers
// @Summary Delete comment by UUID
// @Description
// @Tags comment
// @ID delete-comment
// @Accept  json
// @Produce  json
// @Param commentId path string true "comment ID"
// @Success 204
// @Failure 403 {object} customErrors.NoRightToChangeDayReportError "User doesn't have rights to delete comment."
// @Router /comments/{commentId} [delete]
func (cc *CommentController) DeleteCommentById(ctx *gin.Context) {
	commentID := ctx.Param("commentId")
	userIDRaw, _ := ctx.Get(auth.ContextKeyUserID)
	userID := userIDRaw.(string)

	err := cc.permissionService.CheckIsUserHavingPermissionsForComment(ctx, userID, commentID)
	util.HandleErrorGin(ctx, err)

	err = cc.commentService.DeleteCommentById(ctx, commentID)
	util.HandleErrorGin(ctx, err)

	ctx.JSON(http.StatusOK, gin.H{"status": "successfully deleted"})
}
