package controllers

import (
	"context"
	"net/http"
	"time"

	"mwserver/auth"
	db "mwserver/db/sqlc"
	"mwserver/schemas"
	"mwserver/util"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/jackc/pgx/v5/pgtype"
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
// @Failure 403 {object} util.NoRightToChangeDayReportError "User doesn't have rights to create comment."
// @Router /comments [post]
func (cc *CommentController) CreateComment(ctx *gin.Context) {
	var payload *schemas.CreateCommentPayload

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "Failed payload", "error": err.Error()})
		return
	}

	userIDRaw, _ := ctx.Get(auth.ContextKeyUserID)
	userUUID := pgtype.UUID{Bytes: uuid.MustParse(userIDRaw.(string)), Valid: true}

	dayReportUUID := pgtype.UUID{Bytes: uuid.MustParse(payload.DayReportUuid), Valid: true}

	getIsUserHavingPermissionsForDayReportParams := db.GetIsUserHavingPermissionsForDayReportParams{
		UserUuid:      userUUID,
		DayReportUuid: dayReportUUID,
	}

	userPermission, err := cc.db.GetIsUserHavingPermissionsForDayReport(ctx, getIsUserHavingPermissionsForDayReportParams)
	util.HandleErrorGin(ctx, err)

	if !userPermission.IsPermissionGiven.Bool {
		err := util.MakeNoRightToChangeDayReportError(util.ConvertPgUUIDToUUID(userPermission.WayUuid).String())
		util.HandleErrorGin(ctx, err)
	}

	now := time.Now()
	args := &db.CreateCommentParams{
		Description:   payload.Description,
		OwnerUuid:     pgtype.UUID{Bytes: uuid.MustParse(payload.OwnerUuid), Valid: true},
		DayReportUuid: dayReportUUID,
		UpdatedAt:     pgtype.Timestamp{Time: now, Valid: true},
		CreatedAt:     pgtype.Timestamp{Time: now, Valid: true},
	}

	comment, err := cc.db.CreateComment(ctx, *args)
	util.HandleErrorGin(ctx, err)

	response := schemas.CommentPopulatedResponse{
		Uuid:          util.ConvertPgUUIDToUUID(comment.Uuid).String(),
		Description:   comment.Description,
		OwnerUuid:     util.ConvertPgUUIDToUUID(comment.OwnerUuid).String(),
		OwnerName:     comment.OwnerName,
		CreatedAt:     comment.CreatedAt.Time.Format(util.DEFAULT_STRING_LAYOUT),
		UpdatedAt:     comment.UpdatedAt.Time.Format(util.DEFAULT_STRING_LAYOUT),
		DayReportUuid: util.ConvertPgUUIDToUUID(comment.DayReportUuid).String(),
		WayUUID:       util.ConvertPgUUIDToUUID(userPermission.WayUuid).String(),
		WayName:       userPermission.WayName,
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

	var descriptionPg pgtype.Text
	if payload.Description != nil {
		descriptionPg = pgtype.Text{String: *payload.Description, Valid: true}
	}
	now := time.Now()
	args := &db.UpdateCommentParams{
		Uuid:        pgtype.UUID{Bytes: uuid.MustParse(commentId), Valid: true},
		Description: descriptionPg,
		UpdatedAt:   pgtype.Timestamp{Time: now, Valid: true},
	}

	comment, err := cc.db.UpdateComment(ctx, *args)
	util.HandleErrorGin(ctx, err)

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

	err := cc.db.DeleteComment(ctx, pgtype.UUID{Bytes: uuid.MustParse(commentId), Valid: true})
	util.HandleErrorGin(ctx, err)

	ctx.JSON(http.StatusNoContent, gin.H{"status": "successfully deleted"})

}
