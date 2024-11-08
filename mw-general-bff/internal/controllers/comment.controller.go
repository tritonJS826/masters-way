package controllers

import (
	"net/http"

	"mw-general-bff/internal/schemas"
	"mw-general-bff/internal/services"
	"mw-general-bff/pkg/utils"

	"github.com/gin-gonic/gin"
)

type CommentController struct {
	generalService *services.GeneralService
}

func NewCommentController(generalService *services.GeneralService) *CommentController {
	return &CommentController{generalService}
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

	args := &schemas.CreateCommentPayload{
		Description:   payload.Description,
		DayReportUuid: payload.DayReportUuid,
		OwnerUuid:     payload.OwnerUuid,
	}
	response, err := cc.generalService.CreateComment(ctx, args)
	utils.HandleErrorGin(ctx, err)

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

	args := &services.UpdateCommentParams{
		CommentID:   commentID,
		Description: payload.Description,
	}
	response, err := cc.generalService.UpdateComment(ctx, args)
	utils.HandleErrorGin(ctx, err)

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

	err := cc.generalService.DeleteCommentById(ctx, commentID)
	utils.HandleErrorGin(ctx, err)

	ctx.JSON(http.StatusOK, gin.H{"status": "successfully deleted"})
}
