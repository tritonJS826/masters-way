package controllers

import (
	"context"
	"database/sql"
	"net/http"
	"time"

	db "mwserver/db/sqlc"
	"mwserver/schemas"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

type CommentController struct {
	db  *db.Queries
	ctx context.Context
}

func NewCommentController(db *db.Queries, ctx context.Context) *CommentController {
	return &CommentController{db, ctx}
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
// @Router /comments [post]
func (cc *CommentController) CreateComment(ctx *gin.Context) {
	var payload *schemas.CreateCommentPayload

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "Failed payload", "error": err.Error()})
		return
	}

	now := time.Now()
	args := &db.CreateCommentParams{
		Description:   payload.Description,
		OwnerUuid:     uuid.MustParse(payload.OwnerUuid),
		DayReportUuid: uuid.MustParse(payload.DayReportUuid),
		UpdatedAt:     now,
		CreatedAt:     now,
	}

	comment, err := cc.db.CreateComment(ctx, *args)

	if err != nil {
		ctx.JSON(http.StatusBadGateway, gin.H{"status": "Failed retrieving Comment", "error": err.Error()})
		return
	}

	response := schemas.CommentPopulatedResponse{
		Uuid:          comment.Uuid.String(),
		Description:   comment.Description,
		OwnerUuid:     comment.OwnerUuid.String(),
		OwnerName:     comment.OwnerName,
		CreatedAt:     comment.CreatedAt.String(),
		UpdatedAt:     comment.UpdatedAt.String(),
		DayReportUuid: comment.DayReportUuid.String(),
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
// @Router /comments/{commentId} [patch]
func (cc *CommentController) UpdateComment(ctx *gin.Context) {
	var payload *schemas.UpdateCommentPayload
	commentId := ctx.Param("commentId")

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "Failed payload", "error": err.Error()})
		return
	}

	now := time.Now()
	args := &db.UpdateCommentParams{
		Uuid:        uuid.MustParse(commentId),
		Description: sql.NullString{String: payload.Description, Valid: payload.Description != ""},
		UpdatedAt:   sql.NullTime{Time: now, Valid: true},
	}

	comment, err := cc.db.UpdateComment(ctx, *args)

	if err != nil {
		if err == sql.ErrNoRows {
			ctx.JSON(http.StatusNotFound, gin.H{"status": "failed", "message": "Failed to retrieve Comment with this ID"})
			return
		}
		ctx.JSON(http.StatusBadGateway, gin.H{"status": "Failed retrieving comment", "error": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, comment)
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
func (cc *CommentController) DeleteCommentById(ctx *gin.Context) {
	commentId := ctx.Param("commentId")

	err := cc.db.DeleteComment(ctx, uuid.MustParse(commentId))
	if err != nil {
		ctx.JSON(http.StatusBadGateway, gin.H{"status": "failed", "error": err.Error()})
		return
	}

	ctx.JSON(http.StatusNoContent, gin.H{"status": "successfully deleted"})

}
