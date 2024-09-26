package controllers

import (
	"net/http"

	"mwgeneral/internal/schemas"
	"mwgeneral/internal/services"
	"mwgeneral/pkg/util"

	"github.com/gin-gonic/gin"
)

type WayCollectionWayController struct {
	wayCollectionWayService *services.WayCollectionWayService
}

func NewWayCollectionWayController(wayCollectionWayService *services.WayCollectionWayService) *WayCollectionWayController {
	return &WayCollectionWayController{wayCollectionWayService}
}

// Create wayCollectionWayRoute  handler
// @Summary Create a new wayCollectionWay
// @Description
// @Tags wayCollectionWay
// @ID create-wayCollectionWay
// @Accept  json
// @Produce  json
// @Param request body schemas.CreateWayCollectionWay true "query params"
// @Success 200 {object} schemas.WayCollectionWayResponse
// @Router /wayCollectionWays [post]
func (wc *WayCollectionWayController) CreateWayCollectionWay(ctx *gin.Context) {
	var payload *schemas.CreateWayCollectionWay

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "Failed payload", "error": err.Error()})
		return
	}

	wayCollectionWay, err := wc.wayCollectionWayService.CreateWayCollectionWay(ctx, payload)
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
// @Success 204
// @Router /wayCollectionWays/{wayId}/{wayCollectionId} [delete]
func (wc *WayCollectionWayController) DeleteWayCollectionWayById(ctx *gin.Context) {
	wayID := ctx.Param("wayId")
	wayCollectionID := ctx.Param("wayCollectionId")

	err := wc.wayCollectionWayService.DeleteWayCollectionWayById(ctx, wayID, wayCollectionID)
	util.HandleErrorGin(ctx, err)

	ctx.Status(http.StatusNoContent)
}
