package controllers

import (
	"context"
	"net/http"

	db "mwserver/db/sqlc"
	"mwserver/schemas"
	"mwserver/util"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/jackc/pgx/v5/pgtype"
)

type WayCollectionWayController struct {
	db  *db.Queries
	ctx context.Context
}

func NewWayCollectionWayController(db *db.Queries, ctx context.Context) *WayCollectionWayController {
	return &WayCollectionWayController{db, ctx}
}

// Create wayCollectionWayRoute  handler
// @Summary Create a new wayCollectionWay
// @Description
// @Tags wayCollectionWay
// @ID create-wayCollectionWay
// @Accept  json
// @Produce  json
// @Param request body schemas.CreateWayCollectionWay true "query params"
// @Success 200
// @Router /wayCollectionWays [post]
func (cc *WayCollectionWayController) CreateWayCollectionWay(ctx *gin.Context) {
	var payload *schemas.CreateWayCollectionWay

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "Failed payload", "error": err.Error()})
		return
	}

	args := db.CreateWayCollectionsWaysParams{
		WayCollectionUuid: pgtype.UUID{Bytes: uuid.MustParse(payload.WayCollectionUuid), Valid: true},
		WayUuid:           pgtype.UUID{Bytes: uuid.MustParse(payload.WayUuid), Valid: true},
	}

	wayCollectionWay, err := cc.db.CreateWayCollectionsWays(ctx, args)
	util.HandleErrorGin(ctx, err)

	ctx.JSON(http.StatusOK, wayCollectionWay)
}

// Deleting way handlers
// @Summary Delete wayCollectionWay by UUID
// @Description
// @Tags wayCollectionWay
// @ID delete-wayCollectionWay
// @Accept  json
// @Produce  json
// @Param wayCollectionId path string true "wayCollection ID"
// @Param wayId path string true "way ID"
// @Success 200
// @Router /wayCollectionWays/{wayId}/{wayCollectionId} [delete]
func (cc *WayCollectionWayController) DeleteWayCollectionWayById(ctx *gin.Context) {
	wayCollectionId := ctx.Param("wayCollectionId")
	wayId := ctx.Param("wayId")

	deleteArgs := db.DeleteWayCollectionsWaysByIdsParams{
		WayCollectionUuid: pgtype.UUID{Bytes: uuid.MustParse(wayCollectionId), Valid: true},
		WayUuid:           pgtype.UUID{Bytes: uuid.MustParse(wayId), Valid: true},
	}

	err := cc.db.DeleteWayCollectionsWaysByIds(ctx, deleteArgs)
	util.HandleErrorGin(ctx, err)

	ctx.JSON(http.StatusNoContent, gin.H{"status": "successfuly deleted"})

}
