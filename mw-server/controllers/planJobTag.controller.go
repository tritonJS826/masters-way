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

type PlanJobTagController struct {
	db  *db.Queries
	ctx context.Context
}

func NewPlanJobTagController(db *db.Queries, ctx context.Context) *PlanJobTagController {
	return &PlanJobTagController{db, ctx}
}

// Create planJobTag  handler
// @Summary Create a new planJobTag
// @Description
// @Tags planJobTag
// @ID create-planJobTag
// @Accept  json
// @Produce  json
// @Param request body schemas.CreatePlanJobTagPayload true "query params"
// @Success 200
// @Router /planJobTags [post]
func (cc *PlanJobTagController) CreatePlanJobTag(ctx *gin.Context) {
	var payload *schemas.CreatePlanJobTagPayload

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "Failed payload", "error": err.Error()})
		return
	}

	args := &db.CreatePlansJobTagParams{
		PlanUuid:   uuid.MustParse(payload.PlanUuid),
		JobTagUuid: uuid.MustParse(payload.JobTagUuid),
	}

	planJobTag, err := cc.db.CreatePlansJobTag(ctx, *args)
	util.HandleErrorGin(ctx, err)

	ctx.JSON(http.StatusOK, planJobTag)
}

// Deleting PlanJobTag handlers
// @Summary Delete planJobTag by UUID
// @Description
// @Tags planJobTag
// @ID delete-planJobTag
// @Accept  json
// @Produce  json
// @Param jobTagId path string true "jobTag ID"
// @Param planId path string true "plan ID"
// @Success 200
// @Router /planJobTags/{jobTagId}/{planId} [delete]
func (cc *PlanJobTagController) DeletePlanJobTagById(ctx *gin.Context) {
	jobTagId := ctx.Param("jobTagId")
	planId := ctx.Param("planId")

	args := &db.DeletePlansJobTagByIdsParams{
		PlanUuid:   uuid.MustParse(planId),
		JobTagUuid: uuid.MustParse(jobTagId),
	}
	err := cc.db.DeletePlansJobTagByIds(ctx, *args)
	util.HandleErrorGin(ctx, err)

	ctx.JSON(http.StatusNoContent, gin.H{"status": "successfully deleted"})

}
