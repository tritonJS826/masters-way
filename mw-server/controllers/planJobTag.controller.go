package controllers

import (
	"context"
	"net/http"

	dbPGX "mwserver/db_pgx/sqlc"
	"mwserver/schemas"
	"mwserver/util"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/jackc/pgx/v5/pgtype"
)

type PlanJobTagController struct {
	dbPGX *dbPGX.Queries
	ctx   context.Context
}

func NewPlanJobTagController(dbPGX *dbPGX.Queries, ctx context.Context) *PlanJobTagController {
	return &PlanJobTagController{dbPGX, ctx}
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

	args := dbPGX.CreatePlansJobTagParams{
		PlanUuid:   pgtype.UUID{Bytes: uuid.MustParse(payload.PlanUuid), Valid: true},
		JobTagUuid: pgtype.UUID{Bytes: uuid.MustParse(payload.JobTagUuid), Valid: true},
	}

	planJobTag, err := cc.dbPGX.CreatePlansJobTag(ctx, args)
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

	args := dbPGX.DeletePlansJobTagByIdsParams{
		PlanUuid:   pgtype.UUID{Bytes: uuid.MustParse(planId), Valid: true},
		JobTagUuid: pgtype.UUID{Bytes: uuid.MustParse(jobTagId), Valid: true},
	}
	err := cc.dbPGX.DeletePlansJobTagByIds(ctx, args)
	util.HandleErrorGin(ctx, err)

	ctx.JSON(http.StatusNoContent, gin.H{"status": "successfully deleted"})

}
