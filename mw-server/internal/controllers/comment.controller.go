package controllers

import (
	"net/http"

	"mw-server/internal/auth"
	"mw-server/internal/customErrors"
	"mw-server/internal/schemas"
	"mw-server/internal/services"
	"mw-server/pkg/util"

	"github.com/gin-gonic/gin"
)

// Without next lines swagger does not see openapi models
var _ = &customErrors.NoRightToChangeDayReportError{}

type CommentController struct {
	permissionService *services.PermissionService
	commentService    *services.CommentService
	dayReportService *services.DayReportService
}

func NewCommentController(permissionService *services.PermissionService, commentService *services.CommentService, dayReportService *services.DayReportService) *CommentController {
	return &CommentController{permissionService, commentService, dayReportService}
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

// CreateCommentForTelegram handler
// @Summary Create comment for telegram
// @Description Creates a comment, automatically finding or creating a day report for today
// @Tags comment
// @ID create-comment-telegram
// @Accept json
// @Produce json
// @Param request body schemas.CreateCommentForTelegramPayload true "query params"
// @Success 200 {object} schemas.CommentPopulatedResponse
// @Router /comments/telegram [post]
func (cc *CommentController) CreateCommentForTelegram(ctx *gin.Context) {
	var payload *schemas.CreateCommentForTelegramPayload

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "Failed payload", "error": err.Error()})
		return
	}

	dayReport, err := cc.dayReportService.GetOrCreateTodayDayReport(ctx, payload.WayUuid)
	util.HandleErrorGin(ctx, err)

	commentPayload := &schemas.CreateCommentPayload{
		Description:   payload.Description,
		DayReportUuid: dayReport.Uuid,
		OwnerUuid:   payload.OwnerUuid,
	}

	comment, err := cc.commentService.CreateComment(ctx, commentPayload)
	util.HandleErrorGin(ctx, err)

	response := schemas.CommentPopulatedResponse{
		Uuid:          comment.Uuid,
		Description:   comment.Description,
		OwnerUuid:     comment.OwnerUuid,
		OwnerName:     comment.OwnerName,
		CreatedAt:     comment.CreatedAt,
		UpdatedAt:     comment.UpdatedAt,
		DayReportUuid: comment.DayReportUuid,
		WayUUID:       comment.WayUUID,
		WayName:       comment.WayName,
	}

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
