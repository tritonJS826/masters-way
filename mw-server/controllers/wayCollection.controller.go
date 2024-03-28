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

type WayCollectionController struct {
	db  *db.Queries
	ctx context.Context
}

func NewWayCollectionController(db *db.Queries, ctx context.Context) *WayCollectionController {
	return &WayCollectionController{db, ctx}
}

// Create wayCollectionRoute handler
// @Summary Create a new wayCollection
// @Description
// @Tags wayCollection
// @ID create-wayCollection
// @Accept  json
// @Produce  json
// @Param request body schemas.CreateWayCollectionPayload true "query params"
// @Success 200 {object} schemas.WayCollectionPopulatedResponse
// @Router /wayCollections [post]
func (cc *WayCollectionController) CreateWayCollection(ctx *gin.Context) {
	var payload *schemas.CreateWayCollectionPayload

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "Failed payload", "error": err.Error()})
		return
	}

	now := time.Now()
	args := &db.CreateWayCollectionParams{
		Name:      payload.Name,
		OwnerUuid: uuid.MustParse(payload.OwnerUuid),
		CreatedAt: now,
		UpdatedAt: now,
		Type:      "custom",
	}

	wayCollection, err := cc.db.CreateWayCollection(ctx, *args)

	if err != nil {
		ctx.JSON(http.StatusBadGateway, gin.H{"status": "Failed retrieving way collection", "error": err.Error()})
		return
	}

	response := schemas.WayCollectionPopulatedResponse{
		Uuid:      wayCollection.Uuid.String(),
		Name:      wayCollection.Name,
		Ways:      []schemas.WayPlainResponse{},
		CreatedAt: wayCollection.CreatedAt.String(),
		UpdatedAt: wayCollection.UpdatedAt.String(),
		OwnerUuid: wayCollection.OwnerUuid.String(),
		Type:      string(wayCollection.Type),
	}

	ctx.JSON(http.StatusOK, response)
}

// Update wayCollectionRoute handler
// @Summary Update wayCollection by UUID
// @Description
// @Tags wayCollection
// @ID update-wayCollection
// @Accept  json
// @Produce  json
// @Param request body schemas.UpdateWayCollectionPayload true "query params"
// @Param wayCollectionId path string true "wayCollection ID"
// @Success 200 {object} schemas.WayCollectionPlainResponse
// @Router /wayCollections/{wayCollectionId} [patch]
func (cc *WayCollectionController) UpdateWayCollection(ctx *gin.Context) {
	var payload *schemas.UpdateWayCollectionPayload
	wayCollectionId := ctx.Param("wayCollectionId")

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "Failed payload", "error": err.Error()})
		return
	}

	now := time.Now()
	args := &db.UpdateWayCollectionParams{
		Uuid:      uuid.MustParse(wayCollectionId),
		Name:      sql.NullString{String: payload.Name, Valid: payload.Name != ""},
		UpdatedAt: sql.NullTime{Time: now, Valid: true},
	}

	wayCollection, err := cc.db.UpdateWayCollection(ctx, *args)

	if err != nil {
		if err == sql.ErrNoRows {
			ctx.JSON(http.StatusNotFound, gin.H{"status": "failed", "message": "Failed to retrieve way collection with this ID"})
			return
		}
		ctx.JSON(http.StatusBadGateway, gin.H{"status": "Failed retrieving way collection", "error": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, wayCollection)
}

// Get a single handler
// @Summary Get wayCollections by user UUID
// @Description
// @Tags wayCollection
// @ID get-wayCollections-by-User-uuid
// @Accept  json
// @Produce  json
// @Param userId path string true "user ID"
// @Success 200 {array} schemas.WayCollectionPlainResponse
// @Router /wayCollections/{userId} [get]
func (cc *WayCollectionController) GetWayCollectionsByUserId(ctx *gin.Context) {
	userId := ctx.Param("userId")

	wayCollections, err := cc.db.GetListWayCollectionsByUserId(ctx, uuid.MustParse(userId))
	if err != nil {
		if err == sql.ErrNoRows {
			ctx.JSON(http.StatusNotFound, gin.H{"status": "failed", "message": "Failed to retrieve way  collections with this ID"})
			return
		}
		ctx.JSON(http.StatusBadGateway, gin.H{"status": "Failed retrieving way collections", "error": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, wayCollections)
}

// Deleting way handlers
// @Summary Delete wayCollection by UUID
// @Description
// @Tags wayCollection
// @ID delete-wayCollection
// @Accept  json
// @Produce  json
// @Param wayCollectionId path string true "wayCollection ID"
// @Success 200
// @Router /wayCollections/{wayCollectionId} [delete]
func (cc *WayCollectionController) DeleteWayCollectionById(ctx *gin.Context) {
	wayCollectionId := ctx.Param("wayCollectionId")

	err := cc.db.DeleteWayCollection(ctx, uuid.MustParse(wayCollectionId))
	if err != nil {
		ctx.JSON(http.StatusBadGateway, gin.H{"status": "failed", "error": err.Error()})
		return
	}

	ctx.JSON(http.StatusNoContent, gin.H{"status": "successfuly deleted"})

}
