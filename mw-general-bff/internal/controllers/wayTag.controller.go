package controllers

import (
	"mw-general-bff/internal/services"
	"mwserver/pkg/util"
	"net/http"

	"mwserver/internal/schemas"

	"github.com/gin-gonic/gin"
)

type WayTagController struct {
	generalService *services.GeneralService
}

func NewWayTagController(generalService *services.WayTagService) *WayTagController {
	return &WayTagController{generalService}
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

	response, err := cc.generalService.AddWayTagToWay(ctx, payload.Name, payload.WayUuid)
	util.HandleErrorGin(ctx, err)

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
// @Success 204
// @Router /wayTags/{wayTagId}/{wayId} [delete]
func (cc *WayTagController) DeleteWayTagFromWayByTagId(ctx *gin.Context) {
	wayTagID := ctx.Param("wayTagId")
	wayID := ctx.Param("wayId")

	err := cc.generalService.DeleteWayTagFromWayByTagID(ctx, wayTagID, wayID)
	util.HandleErrorGin(ctx, err)

	ctx.Status(http.StatusNoContent)
}
