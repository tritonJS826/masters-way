package controllers

import (
	"context"
	"net/http"

	db "mwserver/db/sqlc"
	"mwserver/internal/services"
	"mwserver/schemas"
	"mwserver/util"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/jackc/pgx/v5/pgtype"
)

type CompositeWayController struct {
	compositeWayService services.ICompositeWayService
}

func NewCompositeWayController(	compositeWayService services.ICompositeWayService) *CompositeWayController {
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

	response, err := cc.compositeWayService.AddWayToCompositeWay(ctx, services.AddWayToCompositeWayParams{
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
// @Success 200
// @Router /compositeWay/{parentWayId}/{childWayId} [delete]
func (cc *CompositeWayController) DeleteCompositeWayRelation(ctx *gin.Context) {
	parentWayId := ctx.Param("parentWayId")
	childWayId := ctx.Param("childWayId")

	args := db.DeleteWayFromCompositeWayParams{
		ParentUuid: pgtype.UUID{Bytes: uuid.MustParse(parentWayId), Valid: true},
		ChildUuid:  pgtype.UUID{Bytes: uuid.MustParse(childWayId), Valid: true},
	}
	err := cc.db.DeleteWayFromCompositeWay(ctx, args)
	util.HandleErrorGin(ctx, err)

	ctx.JSON(http.StatusNoContent, gin.H{"status": "successfully deleted"})

}
