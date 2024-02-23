package controllers

import (
	"context"
	"database/sql"
	"net/http"

	db "mwserver/db/sqlc"
	"mwserver/schemas"

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
// @ID create-wayTag
// @Accept  json
// @Produce  json
// @Param request body schemas.CreateWayTagPayload true "query params"
// @Success 200 {object} schemas.WayTagResponse
// @Router /wayTags [post]
func (cc *WayTagController) CreateWayTag(ctx *gin.Context) {
	var payload *schemas.CreateWayTagPayload

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "Failed payload", "error": err.Error()})
		return
	}

	args := &db.CreateWayTagParams{
		Name:    payload.Name,
		WayUuid: payload.WayUuid,
	}

	wayTag, err := cc.db.CreateWayTag(ctx, *args)

	if err != nil {
		ctx.JSON(http.StatusBadGateway, gin.H{"status": "Failed retrieving wayTag", "error": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"status": "successfully created wayTag", "wayTag": wayTag})
}

// Update wayTagRoute handler
// @Summary Update wayTag by UUID
// @Description
// @ID update-wayTag
// @Accept  json
// @Produce  json
// @Param request body schemas.UpdateWayTagPayload true "query params"
// @Param wayTagId path string true "wayTag ID"
// @Success 200 {object} schemas.WayTagResponse
// @Router /wayTags/{wayTagId} [patch]
func (cc *WayTagController) UpdateWayTag(ctx *gin.Context) {
	var payload *schemas.UpdateWayTagPayload
	wayTagId := ctx.Param("wayTagId")

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "Failed payload", "error": err.Error()})
		return
	}

	args := &db.UpdateWayTagParams{
		Uuid: uuid.MustParse(wayTagId),
		Name: sql.NullString{String: payload.Name, Valid: payload.Name != ""},
	}

	wayTag, err := cc.db.UpdateWayTag(ctx, *args)

	if err != nil {
		if err == sql.ErrNoRows {
			ctx.JSON(http.StatusNotFound, gin.H{"status": "failed", "message": "Failed to retrieve wayTag with this ID"})
			return
		}
		ctx.JSON(http.StatusBadGateway, gin.H{"status": "Failed retrieving wayTag", "error": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"status": "successfully updated wayTag", "wayTag": wayTag})
}

// Get a single handler
// @Summary Get wayTags by way UUID
// @Description
// @ID get-wayTags-by-Way-uuid
// @Accept  json
// @Produce  json
// @Param wayId path string true "way ID"
// @Success 200 {array} schemas.WayTagResponse
// @Router /wayTags/{wayId} [get]
func (cc *WayTagController) GetWayTagsByWayId(ctx *gin.Context) {
	wayId := ctx.Param("wayId")

	wayTags, err := cc.db.GetListWayTagsByWayId(ctx, uuid.MustParse(wayId))
	if err != nil {
		if err == sql.ErrNoRows {
			ctx.JSON(http.StatusNotFound, gin.H{"status": "failed", "message": "Failed to retrieve wayTag with this ID"})
			return
		}
		ctx.JSON(http.StatusBadGateway, gin.H{"status": "Failed retrieving wayTag", "error": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"status": "Successfully retrived id", "wayTags": wayTags})
}

// Deleting wayTag handlers
// @Summary Delete wayTag by UUID
// @Description
// @ID delete-wayTag
// @Accept  json
// @Produce  json
// @Param wayTagId path string true "wayTag ID"
// @Success 200
// @Router /wayTags/{wayTagId} [delete]
func (cc *WayTagController) DeleteWayTagById(ctx *gin.Context) {
	wayTagId := ctx.Param("wayTagId")

	err := cc.db.DeleteWayTag(ctx, uuid.MustParse(wayTagId))
	if err != nil {
		ctx.JSON(http.StatusBadGateway, gin.H{"status": "failed", "error": err.Error()})
		return
	}

	ctx.JSON(http.StatusNoContent, gin.H{"status": "successfuly deleted"})

}
