package controllers

import (
	"context"
	"net/http"

	db "mwserver/db/sqlc"
	"mwserver/schemas"
	"mwserver/util"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

type WayTagController struct {
	db  *db.Queries
	ctx context.Context
}

func NewWayTagController(db *db.Queries, ctx context.Context) *WayTagController {
	return &WayTagController{db, ctx}
}

// Create wayTagRoute handler
// @Summary Create a new wayTag
// @Description
// @Tags wayTag
// @ID create-wayTag
// @Accept  json
// @Produce  json
// @Param request body schemas.CreateWayTagPayload true "query params"
// @Success 200 {object} schemas.WayTagResponse
// @Router /wayTags [post]
func (cc *WayTagController) AddWayTagToWay(ctx *gin.Context) {
	var payload *schemas.CreateWayTagPayload

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "Failed payload", "error": err.Error()})
		return
	}

	wayTag, err := cc.db.GetWayTagByName(ctx, payload.Name)

	if err != nil {
		newWayTag, _ := cc.db.CreateWayTag(ctx, payload.Name)
		wayTag = newWayTag
	}

	args := &db.CreateWaysWayTagParams{
		WayTagUuid: wayTag.Uuid,
		WayUuid:    uuid.MustParse(payload.WayUuid),
	}
	_, err = cc.db.CreateWaysWayTag(ctx, *args)
	util.HandleErrorGin(ctx, err)

	response := schemas.WayTagResponse{
		Uuid: wayTag.Uuid.String(),
		Name: wayTag.Name,
	}

	ctx.JSON(http.StatusOK, response)
}

// Deleting wayTag handlers
// @Summary Delete wayTag by UUID
// @Description
// @Tags wayTag
// @ID delete-wayTag
// @Accept  json
// @Produce  json
// @Param wayTagId path string true "wayTag ID"
// @Param wayId path string true "way ID"
// @Success 200
// @Router /wayTags/{wayTagId}/{wayId} [delete]
func (cc *WayTagController) DeleteWayTagFromWayByTagId(ctx *gin.Context) {
	wayTagId := ctx.Param("wayTagId")
	wayId := ctx.Param("wayId")

	args := db.DeleteWayTagFromWayParams{
		WayUuid:    uuid.MustParse(wayId),
		WayTagUuid: uuid.MustParse(wayTagId),
	}

	err := cc.db.DeleteWayTagFromWay(ctx, args)
	if err != nil {
		ctx.JSON(http.StatusBadGateway, gin.H{"status": "failed", "error": err.Error()})
		return
	}

	ctx.JSON(http.StatusNoContent, gin.H{"status": "successfuly deleted"})
}
