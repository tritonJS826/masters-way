package controllers

import (
	"context"
	"net/http"
	"time"

	db "mwserver/db/sqlc"
	"mwserver/schemas"
	"mwserver/services"
	"mwserver/util"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/jackc/pgx/v5/pgtype"
)

type WayCollectionController struct {
	db  *db.Queries
	ctx context.Context
	ls  *services.LimitService
}

func NewWayCollectionController(db *db.Queries, ctx context.Context, ls *services.LimitService) *WayCollectionController {
	return &WayCollectionController{db, ctx, ls}
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

	userID := uuid.MustParse(payload.OwnerUuid)
	err := cc.ls.CheckIsLimitReachedByPricingPlan(ctx, &services.LimitReachedParams{
		LimitName: services.MaxCustomCollections,
		UserID:    userID,
	})
	util.HandleErrorGin(ctx, err)

	now := time.Now()
	args := db.CreateWayCollectionParams{
		Name:      payload.Name,
		OwnerUuid: pgtype.UUID{Bytes: uuid.MustParse(payload.OwnerUuid), Valid: true},
		CreatedAt: pgtype.Timestamp{Time: now, Valid: true},
		UpdatedAt: pgtype.Timestamp{Time: now, Valid: true},
		Type:      "custom",
	}

	wayCollection, err := cc.db.CreateWayCollection(ctx, args)

	if err != nil {
		ctx.JSON(http.StatusBadGateway, gin.H{"status": "Failed retrieving way collection", "error": err.Error()})
		return
	}

	response := schemas.WayCollectionPopulatedResponse{
		Uuid:      util.ConvertPgUUIDToUUID(wayCollection.Uuid).String(),
		Name:      wayCollection.Name,
		Ways:      []schemas.WayPlainResponse{},
		CreatedAt: wayCollection.CreatedAt.Time.Format(util.DEFAULT_STRING_LAYOUT),
		UpdatedAt: wayCollection.UpdatedAt.Time.Format(util.DEFAULT_STRING_LAYOUT),
		OwnerUuid: util.ConvertPgUUIDToUUID(wayCollection.OwnerUuid).String(),
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
	// TODO: If payload.Name is empty, we should not perform an update in the database
	args := db.UpdateWayCollectionParams{
		Uuid:      pgtype.UUID{Bytes: uuid.MustParse(wayCollectionId), Valid: true},
		Name:      pgtype.Text{String: payload.Name, Valid: payload.Name != ""},
		UpdatedAt: pgtype.Timestamp{Time: now, Valid: true},
	}

	wayCollection, err := cc.db.UpdateWayCollection(ctx, args)
	util.HandleErrorGin(ctx, err)

	ctx.JSON(http.StatusOK, wayCollection)
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

	err := cc.db.DeleteWayCollection(ctx, pgtype.UUID{Bytes: uuid.MustParse(wayCollectionId), Valid: true})
	util.HandleErrorGin(ctx, err)

	ctx.JSON(http.StatusNoContent, gin.H{"status": "successfuly deleted"})

}
