package controllers

import (
	"mw-general-bff/internal/schemas"
	"mw-general-bff/internal/services"
	"mw-general-bff/pkg/utils"
	"net/http"

	"github.com/gin-gonic/gin"
)

type WayCollectionWayController struct {
	generalService *services.GeneralService
}

func NewWayCollectionWayController(generalService *services.GeneralService) *WayCollectionWayController {
	return &WayCollectionWayController{generalService}
}

// Create wayCollectionWayRoute  handler
// @Summary Create a new wayCollectionWay
// @Description
// @Tags wayCollectionWay
// @ID create-wayCollectionWay
// @Accept  json
// @Produce  json
// @Param request body schemas.CreateWayCollectionWay true "query params"
// @Success 200 {object} openapiGeneral.MwserverInternalSchemasWayCollectionWayResponse
// @Router /wayCollectionWays [post]
func (wc *WayCollectionWayController) CreateWayCollectionWay(ctx *gin.Context) {
	var payload *schemas.CreateWayCollectionWay

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "Failed payload", "error": err.Error()})
		return
	}

	args := &schemas.CreateWayCollectionWay{
		WayCollectionUuid: payload.WayCollectionUuid,
		WayUuid:           payload.WayUuid,
	}

	wayCollectionWay, err := wc.generalService.CreateWayCollectionWay(ctx, args)
	utils.HandleErrorGin(ctx, err)

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
// @Success 204
// @Router /wayCollectionWays/{wayId}/{wayCollectionId} [delete]
func (wc *WayCollectionWayController) DeleteWayCollectionWayById(ctx *gin.Context) {
	wayID := ctx.Param("wayId")
	wayCollectionID := ctx.Param("wayCollectionId")

	err := wc.generalService.DeleteWayCollectionWayById(ctx, wayID, wayCollectionID)
	utils.HandleErrorGin(ctx, err)

	ctx.Status(http.StatusNoContent)
}
