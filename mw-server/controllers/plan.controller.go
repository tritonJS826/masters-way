package controllers

import (
	"context"
	"net/http"
	"time"

	dbPGX "mwserver/db_pgx/sqlc"
	"mwserver/schemas"
	"mwserver/util"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/jackc/pgx/v5/pgtype"
	"github.com/samber/lo"
)

type PlanController struct {
	dbPGX *dbPGX.Queries
	ctx   context.Context
}

func NewPlanController(dbPGX *dbPGX.Queries, ctx context.Context) *PlanController {
	return &PlanController{dbPGX, ctx}
}

// Create Plan handler
// @Summary Create a new plan
// @Description
// @Tags plan
// @ID create-plan
// @Accept  json
// @Produce  json
// @Param request body schemas.CreatePlanPayload true "query params"
// @Success 200 {object} schemas.PlanPopulatedResponse
// @Router /plans [post]
func (cc *PlanController) CreatePlan(ctx *gin.Context) {
	var payload *schemas.CreatePlanPayload

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "Failed payload", "error": err.Error()})
		return
	}

	now := time.Now()
	args := dbPGX.CreatePlanParams{
		Description:   payload.Description,
		Time:          int32(payload.Time),
		OwnerUuid:     pgtype.UUID{Bytes: uuid.MustParse(payload.OwnerUuid), Valid: true},
		IsDone:        payload.IsDone,
		DayReportUuid: pgtype.UUID{Bytes: uuid.MustParse(payload.DayReportUuid), Valid: true},
		CreatedAt:     pgtype.Timestamp{Time: now, Valid: true},
		UpdatedAt:     pgtype.Timestamp{Time: now, Valid: true},
	}

	plan, err := cc.dbPGX.CreatePlan(ctx, args)
	util.HandleErrorGin(ctx, err)

	response := schemas.PlanPopulatedResponse{
		Uuid:          util.ConvertPgUUIDToUUID(plan.Uuid).String(),
		CreatedAt:     plan.CreatedAt.Time.Format(util.DEFAULT_STRING_LAYOUT),
		UpdatedAt:     plan.UpdatedAt.Time.Format(util.DEFAULT_STRING_LAYOUT),
		Description:   plan.Description,
		Time:          plan.Time,
		OwnerUuid:     util.ConvertPgUUIDToUUID(plan.OwnerUuid).String(),
		OwnerName:     plan.OwnerName,
		IsDone:        plan.IsDone,
		DayReportUuid: util.ConvertPgUUIDToUUID(plan.DayReportUuid).String(),
		Tags:          make([]schemas.JobTagResponse, 0),
	}

	ctx.JSON(http.StatusOK, response)
}

// Update Plan handler
// @Summary Update plan by UUID
// @Description
// @Tags plan
// @ID update-plan
// @Accept  json
// @Produce  json
// @Param request body schemas.UpdatePlanPayload true "query params"
// @Param planId path string true "plan UUID"
// @Success 200 {object} schemas.PlanPopulatedResponse
// @Router /plans/{planId} [patch]
func (cc *PlanController) UpdatePlan(ctx *gin.Context) {
	var payload *schemas.UpdatePlanPayload
	PlanId := ctx.Param("planId")

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "Failed payload", "error": err.Error()})
		return
	}

	now := time.Now()
	args := dbPGX.UpdatePlanParams{
		Uuid:        pgtype.UUID{Bytes: uuid.MustParse(PlanId), Valid: true},
		UpdatedAt:   pgtype.Timestamp{Time: now, Valid: true},
		Description: pgtype.Text{String: payload.Description, Valid: payload.Description != ""},
		Time:        pgtype.Int4{Int32: int32(payload.Time), Valid: payload.Time != 0},
		IsDone:      pgtype.Bool{Bool: payload.IsDone, Valid: true},
	}

	plan, err := cc.dbPGX.UpdatePlan(ctx, args)
	util.HandleErrorGin(ctx, err)

	tagUuids := lo.Map(plan.TagUuids, func(stringifiedUuid string, i int) pgtype.UUID {
		return pgtype.UUID{Bytes: uuid.MustParse(stringifiedUuid), Valid: true}
	})

	dbTags, err := cc.dbPGX.GetListLabelsByLabelUuids(ctx, tagUuids)
	util.HandleErrorGin(ctx, err)
	tags := lo.Map(dbTags, func(dbTag dbPGX.JobTag, i int) schemas.JobTagResponse {
		return schemas.JobTagResponse{
			Uuid:        util.ConvertPgUUIDToUUID(dbTag.Uuid).String(),
			Name:        dbTag.Name,
			Description: dbTag.Description,
			Color:       dbTag.Color,
		}
	})

	response := schemas.PlanPopulatedResponse{
		Uuid:          util.ConvertPgUUIDToUUID(plan.Uuid).String(),
		CreatedAt:     plan.CreatedAt.Time.Format(util.DEFAULT_STRING_LAYOUT),
		UpdatedAt:     plan.UpdatedAt.Time.Format(util.DEFAULT_STRING_LAYOUT),
		Description:   plan.Description,
		Time:          plan.Time,
		OwnerUuid:     util.ConvertPgUUIDToUUID(plan.OwnerUuid).String(),
		OwnerName:     plan.OwnerName,
		IsDone:        plan.IsDone,
		DayReportUuid: util.ConvertPgUUIDToUUID(plan.DayReportUuid).String(),
		Tags:          tags,
	}

	ctx.JSON(http.StatusOK, response)
}

// Deleting Plan handlers
// @Summary Delete plan by UUID
// @Description
// @Tags plan
// @ID delete-plan
// @Accept  json
// @Produce  json
// @Param planId path string true "plan ID"
// @Success 200
// @Router /plans/{planId} [delete]
func (cc *PlanController) DeletePlanById(ctx *gin.Context) {
	planId := ctx.Param("planId")

	err := cc.dbPGX.DeletePlan(ctx, pgtype.UUID{Bytes: uuid.MustParse(planId), Valid: true})
	util.HandleErrorGin(ctx, err)

	ctx.JSON(http.StatusNoContent, gin.H{"status": "successfully deleted"})

}
