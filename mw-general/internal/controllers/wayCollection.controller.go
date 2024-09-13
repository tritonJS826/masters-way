package controllers

import (
	"net/http"

	"mw-general/internal/schemas"
	"mw-general/internal/services"
	"mw-general/pkg/util"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

type WayCollectionController struct {
	limitService         *services.LimitService
	wayCollectionService *services.WayCollectionService
}

func NewWayCollectionController(limitService *services.LimitService, wayCollectionService *services.WayCollectionService) *WayCollectionController {
	return &WayCollectionController{limitService, wayCollectionService}
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
func (wc *WayCollectionController) CreateWayCollection(ctx *gin.Context) {
	var payload *schemas.CreateWayCollectionPayload

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "Failed payload", "error": err.Error()})
		return
	}

	err := wc.limitService.CheckIsLimitReachedByPricingPlan(ctx, &services.LimitReachedParams{
		LimitName: services.MaxCustomCollections,
		UserID:    uuid.MustParse(payload.OwnerUuid),
	})
	util.HandleErrorGin(ctx, err)

	response, err := wc.wayCollectionService.CreateWayCollection(ctx, payload)
	util.HandleErrorGin(ctx, err)

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
func (wc *WayCollectionController) UpdateWayCollection(ctx *gin.Context) {
	var payload *schemas.UpdateWayCollectionPayload
	wayCollectionID := ctx.Param("wayCollectionId")

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "Failed payload", "error": err.Error()})
		return
	}

	wayCollection, err := wc.wayCollectionService.UpdateWayCollection(ctx, wayCollectionID, payload.Name)
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
// @Success 204
// @Router /wayCollections/{wayCollectionId} [delete]
func (wc *WayCollectionController) DeleteWayCollectionById(ctx *gin.Context) {
	wayCollectionID := ctx.Param("wayCollectionId")

	err := wc.wayCollectionService.DeleteWayCollectionById(ctx, wayCollectionID)
	util.HandleErrorGin(ctx, err)

	ctx.Status(http.StatusNoContent)
}
