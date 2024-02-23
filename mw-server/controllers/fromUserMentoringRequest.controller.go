package controllers

import (
	"context"
	"net/http"

	db "mwserver/db/sqlc"
	"mwserver/schemas"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

type FromUserMentoringRequestController struct {
	db  *db.Queries
	ctx context.Context
}

func NewFromUserMentoringRequestController(db *db.Queries, ctx context.Context) *FromUserMentoringRequestController {
	return &FromUserMentoringRequestController{db, ctx}
}

// Create fromUserMentoringRequest handler
// @Summary Create a new fromUserMentoringRequest
// @Description
// @ID create-fromUserMentoringRequest
// @Accept  json
// @Produce  json
// @Param request body schemas.CreateFromUserMentoringRequestPayload true "query params"
// @Success 200
// @Router /fromUserMentoringRequests [post]
func (cc *FromUserMentoringRequestController) CreateFromUserMentoringRequest(ctx *gin.Context) {
	var payload *schemas.CreateFromUserMentoringRequestPayload

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "Failed payload", "error": err.Error()})
		return
	}

	args := &db.CreateFromUserMentoringRequestParams{
		UserUuid: payload.UserUuid,
		WayUuid:  payload.WayUuid,
	}

	fromUserMentoringRequest, err := cc.db.CreateFromUserMentoringRequest(ctx, *args)

	if err != nil {
		ctx.JSON(http.StatusBadGateway, gin.H{"status": "Failed retrieving fromUserMentoringRequest", "error": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"status": "successfully created fromUserMentoringRequest", "fromUserMentoringRequest": fromUserMentoringRequest})
}

// Deleting fromUserMentoringRequest handlers
// @Summary Delete fromUserMentoringRequest by UUID
// @Description
// @ID delete-fromUserMentoringRequest
// @Accept  json
// @Produce  json
// @Param userUuid path string true "user UUID"
// @Param wayUuid path string true "way UUID"
// @Success 200
// @Router /fromUserMentoringRequests/{userUuid}/{wayUuid} [delete]
func (cc *FromUserMentoringRequestController) DeleteFromUserMentoringRequestById(ctx *gin.Context) {
	userUuid := ctx.Param("userUuid")
	wayUuid := ctx.Param("wayUuid")

	args := db.DeleteFromUserMentoringRequestByIdsParams{
		UserUuid: uuid.MustParse(userUuid),
		WayUuid:  uuid.MustParse(wayUuid),
	}

	err := cc.db.DeleteFromUserMentoringRequestByIds(ctx, args)
	if err != nil {
		ctx.JSON(http.StatusBadGateway, gin.H{"status": "failed", "error": err.Error()})
		return
	}

	ctx.JSON(http.StatusNoContent, gin.H{"status": "successfully deleted"})

}
