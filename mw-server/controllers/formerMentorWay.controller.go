package controllers

import (
	"context"
	"net/http"

	db "mwserver/db/sqlc"
	"mwserver/schemas"

	"github.com/gin-gonic/gin"
)

type FormerMentorWayController struct {
	db  *db.Queries
	ctx context.Context
}

func NewFormerMentorWayController(db *db.Queries, ctx context.Context) *FormerMentorWayController {
	return &FormerMentorWayController{db, ctx}
}

// Create formerMentorWay handler
// @Summary Create a new formerMentorWay
// @Description
// @Tags formerMentorWay
// @ID create-formerMentorWay
// @Accept  json
// @Produce  json
// @Param request body schemas.CreateFormerMentorWayPayload true "query params"
// @Success 200
// @Router /formerMentorWayWays [post]
func (cc *FormerMentorWayController) CreateFormerMentorWay(ctx *gin.Context) {
	var payload *schemas.CreateFormerMentorWayPayload

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "Failed payload", "error": err.Error()})
		return
	}

	args := &db.CreateFormerMentorsWayParams{
		FormerMentorUuid: payload.FormerMentorUuid,
		WayUuid:          payload.WayUuid,
	}

	formerMentorWay, err := cc.db.CreateFormerMentorsWay(ctx, *args)

	if err != nil {
		ctx.JSON(http.StatusBadGateway, gin.H{"status": "Failed retrieving FormerMentorWay", "error": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, formerMentorWay)
}
