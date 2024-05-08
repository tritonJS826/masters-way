package controllers

import (
	"context"
	"net/http"

	db "mwserver/db/sqlc"
	"mwserver/schemas"
	"mwserver/util"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

type CompositeWayController struct {
	db  *db.Queries
	ctx context.Context
}

func NewCompositeWayController(db *db.Queries, ctx context.Context) *CompositeWayController {
	return &CompositeWayController{db, ctx}
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

	args := &db.AddWayToCompositeWayParams{
		ChildUuid:  uuid.MustParse(payload.ChildWayUuid),
		ParentUuid: uuid.MustParse(payload.ParentWayUuid),
	}

	compositeWayRelationDb, err := cc.db.AddWayToCompositeWay(ctx, *args)
	util.HandleErrorGin(ctx, err)

	compositeWayRelation := schemas.CompositeWayRelation{
		ChildWayUuid:  compositeWayRelationDb.ChildUuid.String(),
		ParentWayUuid: compositeWayRelationDb.ChildUuid.String(),
	}

	ctx.JSON(http.StatusOK, compositeWayRelation)
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

	args := &db.DeleteWayFromCompositeWayParams{
		ParentUuid: uuid.MustParse(parentWayId),
		ChildUuid:  uuid.MustParse(childWayId),
	}
	err := cc.db.DeleteWayFromCompositeWay(ctx, *args)
	util.HandleErrorGin(ctx, err)

	ctx.JSON(http.StatusNoContent, gin.H{"status": "successfully deleted"})

}
