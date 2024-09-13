package controllers

import (
	"net/http"

	"mw-general/internal/schemas"
	"mw-general/internal/services"
	"mw-general/pkg/util"

	"github.com/gin-gonic/gin"
)

type CompositeWayController struct {
	compositeWayService *services.CompositeWayService
}

func NewCompositeWayController(compositeWayService *services.CompositeWayService) *CompositeWayController {
	return &CompositeWayController{compositeWayService}
}

// Create compositeWay handler
// @Summary Add a way to composite way
// @Description
// @Tags compositeWay
// @ID create-compositeWay
// @Accept  json
// @Produce  json
// @Param request body schemas.AddWayToCompositeWayPayload true "query params"
// @Success 200 {object} schemas.CompositeWayRelation
// @Router /compositeWay [post]
func (cc *CompositeWayController) AddWayToCompositeWay(ctx *gin.Context) {
	var payload *schemas.AddWayToCompositeWayPayload

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "Failed payload", "error": err.Error()})
		return
	}

	response, err := cc.compositeWayService.AddWayToCompositeWay(ctx, &services.AddWayToCompositeWayParams{
		ChildWayID:  payload.ChildWayUuid,
		ParentWayID: payload.ParentWayUuid,
	})
	util.HandleErrorGin(ctx, err)

	ctx.JSON(http.StatusOK, response)
}

// Deleting compositeWay handlers
// @Summary Delete composite way relation
// @Description
// @Tags compositeWay
// @ID delete-compositeWay relation
// @Accept  json
// @Produce  json
// @Param parentWayId path string true "parentWay ID"
// @Param childWayId path string true "childWay ID"
// @Success 204
// @Router /compositeWay/{parentWayId}/{childWayId} [delete]
func (cwc *CompositeWayController) DeleteCompositeWayRelation(ctx *gin.Context) {
	parentWayID := ctx.Param("parentWayId")
	childWayID := ctx.Param("childWayId")

	err := cwc.compositeWayService.DeleteCompositeWayRelation(ctx, parentWayID, childWayID)
	util.HandleErrorGin(ctx, err)

	ctx.Status(http.StatusNoContent)
}
