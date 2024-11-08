package controllers

import (
	"mw-general-bff/internal/schemas"
	"mw-general-bff/internal/services"
	"mw-general-bff/pkg/utils"
	"net/http"

	"github.com/gin-gonic/gin"
)

type CompositeWayController struct {
	generalService *services.GeneralService
}

func NewCompositeWayController(compositeWayService *services.GeneralService) *CompositeWayController {
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
	args := &schemas.CreateCommentPayload{
		Description:   payload.Description,
		DayReportUuid: payload.DayReportUuid,
		OwnerUuid:     payload.OwnerUuid,
	}
	response, err := cc.generalService.AddWayToCompositeWay(ctx, args)
	utils.HandleErrorGin(ctx, err)

	// response, err := cc.compositeWayService.AddWayToCompositeWay(ctx, &services.AddWayToCompositeWayParams{
	// 	ChildWayID:  payload.ChildWayUuid,
	// 	ParentWayID: payload.ParentWayUuid,
	// })
	// util.HandleErrorGin(ctx, err)

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
	// parentWayID := ctx.Param("parentWayId")
	// childWayID := ctx.Param("childWayId")

	// err := cwc.compositeWayService.DeleteCompositeWayRelation(ctx, parentWayID, childWayID)
	// util.HandleErrorGin(ctx, err)

	// ctx.Status(http.StatusNoContent)
}
