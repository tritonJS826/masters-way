package controllers

import (
	"context"
	"database/sql"
	"net/http"
	"time"

	db "mwserver/db/sqlc"
	"mwserver/schemas"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

type PlanController struct {
	db  *db.Queries
	ctx context.Context
}

func NewPlanController(db *db.Queries, ctx context.Context) *PlanController {
	return &PlanController{db, ctx}
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
	args := &db.CreatePlanParams{
		Description:   payload.Description,
		Time:          int32(payload.Time),
		OwnerUuid:     uuid.MustParse(payload.OwnerUuid),
		IsDone:        payload.IsDone,
		DayReportUuid: uuid.MustParse(payload.DayReportUuid),
		CreatedAt:     now,
		UpdatedAt:     now,
	}

	plan, err := cc.db.CreatePlan(ctx, *args)

	if err != nil {
		ctx.JSON(http.StatusBadGateway, gin.H{"status": "Failed retrieving Plan", "error": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, plan)
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
	PlanId := ctx.Param("PlanId")

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "Failed payload", "error": err.Error()})
		return
	}

	now := time.Now()
	args := &db.UpdatePlanParams{
		Uuid:           uuid.MustParse(PlanId),
		UpdatedAt:      sql.NullTime{Time: now, Valid: true},
		Job:            sql.NullString{String: payload.Description, Valid: payload.Description != ""},
		EstimationTime: sql.NullInt32{Int32: int32(payload.Time), Valid: payload.Time != 0},
		IsDone:         sql.NullBool{Bool: payload.IsDone, Valid: true},
	}

	plan, err := cc.db.UpdatePlan(ctx, *args)

	if err != nil {
		if err == sql.ErrNoRows {
			ctx.JSON(http.StatusNotFound, gin.H{"status": "failed", "message": "Failed to retrieve Plan with this ID"})
			return
		}
		ctx.JSON(http.StatusBadGateway, gin.H{"status": "Failed retrieving Plan", "error": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, plan)
}

// Get plans by day report uuid handler
// @Summary Get plans by dayReport UUID
// @Description
// @Tags plan
// @ID get-plans-by-DayReport-uuid
// @Accept  json
// @Produce  json
// @Param dayReportId path string true "dayReport UUID"
// @Success 200 {array} schemas.PlanPopulatedResponse
// @Router /plans/{dayReportId} [get]
func (cc *PlanController) GetPlansByDayReportId(ctx *gin.Context) {
	dayReportId := ctx.Param("dayReportId")

	plans, err := cc.db.GetListPlansByDayReportId(ctx, uuid.MustParse(dayReportId))
	if err != nil {
		if err == sql.ErrNoRows {
			ctx.JSON(http.StatusNotFound, gin.H{"status": "failed", "message": "Failed to retrieve Plan with this ID"})
			return
		}
		ctx.JSON(http.StatusBadGateway, gin.H{"status": "Failed retrieving Plan", "error": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, plans)
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

	err := cc.db.DeletePlan(ctx, uuid.MustParse(planId))
	if err != nil {
		ctx.JSON(http.StatusBadGateway, gin.H{"status": "failed", "error": err.Error()})
		return
	}

	ctx.JSON(http.StatusNoContent, gin.H{"status": "successfully deleted"})

}
