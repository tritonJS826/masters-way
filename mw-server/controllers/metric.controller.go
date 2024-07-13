package controllers

import (
	"context"
	"net/http"
	"time"

	dbPGX "mwserver/db_pgx/sqlc"
	"mwserver/schemas"
	"mwserver/services"
	"mwserver/util"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/jackc/pgx/v5/pgtype"
)

type MetricController struct {
	dbPGX *dbPGX.Queries
	ctx   context.Context
}

func NewMetricController(dbPGX *dbPGX.Queries, ctx context.Context) *MetricController {
	return &MetricController{dbPGX, ctx}
}

// Create Metric  handler
// @Summary Create a new metric
// @Description
// @Tags metric
// @ID create-metric
// @Accept  json
// @Produce  json
// @Param request body schemas.CreateMetricPayload true "query params"
// @Success 200 {object} schemas.MetricResponse
// @Router /metrics [post]
func (cc *MetricController) CreateMetric(ctx *gin.Context) {
	var payload *schemas.CreateMetricPayload

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "Failed payload", "error": err.Error()})
		return
	}

	now := time.Now()

	parsedTime, err := time.Parse(util.DEFAULT_STRING_LAYOUT, payload.DoneDate)
	args := dbPGX.CreateMetricParams{
		Description:      payload.Description,
		IsDone:           payload.IsDone,
		DoneDate:         pgtype.Timestamp{Time: parsedTime, Valid: err != nil},
		MetricEstimation: int32(payload.MetricEstimation),
		WayUuid:          pgtype.UUID{Bytes: uuid.MustParse(payload.WayUuid), Valid: true},
		UpdatedAt:        pgtype.Timestamp{Time: now, Valid: true},
	}

	metric, err := cc.dbPGX.CreateMetric(ctx, args)
	util.HandleErrorGin(ctx, err)
	err = services.UpdateWayIsCompletedStatus(cc.dbPGX, ctx, metric.WayUuid)
	util.HandleErrorGin(ctx, err)

	ctx.JSON(http.StatusOK, metric)
}

// Update Metric handler
// @Summary Update metric by UUID
// @Description
// @Tags metric
// @ID update-metric
// @Accept  json
// @Produce  json
// @Param request body schemas.UpdateMetricPayload true "query params"
// @Param metricId path string true "metric UUID"
// @Success 200 {object} schemas.MetricResponse
// @Router /metrics/{metricId} [patch]
func (cc *MetricController) UpdateMetric(ctx *gin.Context) {
	var payload *schemas.UpdateMetricPayload
	metricId := ctx.Param("metricId")

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "Failed payload", "error": err.Error()})
		return
	}

	now := time.Now()

	var isDoneNullBool pgtype.Bool
	var doneDateNullTime pgtype.Timestamp
	if payload.IsDone != nil {
		isDoneNullBool = pgtype.Bool{Bool: *payload.IsDone, Valid: true}
		doneDateNullTime = pgtype.Timestamp{Time: now, Valid: *payload.IsDone}
	}

	var descriptionNullString pgtype.Text
	if payload.Description != nil {
		descriptionNullString = pgtype.Text{String: *payload.Description, Valid: true}
	}

	var metricEstimationNullInt32 pgtype.Int4
	if payload.MetricEstimation != nil {
		metricEstimationNullInt32 = pgtype.Int4{Int32: *payload.MetricEstimation, Valid: true}
	}

	args := dbPGX.UpdateMetricParams{
		Uuid:             pgtype.UUID{Bytes: uuid.MustParse(metricId), Valid: true},
		UpdatedAt:        pgtype.Timestamp{Time: now, Valid: true},
		Description:      descriptionNullString,
		IsDone:           isDoneNullBool,
		DoneDate:         doneDateNullTime,
		MetricEstimation: metricEstimationNullInt32,
	}

	metric, err := cc.dbPGX.UpdateMetric(ctx, args)
	util.HandleErrorGin(ctx, err)
	err = services.UpdateWayIsCompletedStatus(cc.dbPGX, ctx, metric.WayUuid)
	util.HandleErrorGin(ctx, err)

	response := schemas.MetricResponse{
		Uuid:             util.ConvertPgUUIDToUUID(metric.Uuid).String(),
		Description:      metric.Description,
		IsDone:           metric.IsDone,
		DoneDate:         util.MarshalPgTimestamp(metric.DoneDate),
		MetricEstimation: metric.MetricEstimation,
	}

	ctx.JSON(http.StatusOK, response)
}

// Deleting Metric handlers
// @Summary Delete metric by UUID
// @Description
// @Tags metric
// @ID delete-metric
// @Accept  json
// @Produce  json
// @Param metricId path string true "metric ID"
// @Success 200
// @Router /metrics/{metricId} [delete]
func (cc *MetricController) DeleteMetricById(ctx *gin.Context) {
	metricId := ctx.Param("metricId")

	removedMetric, err := cc.dbPGX.DeleteMetric(ctx, pgtype.UUID{Bytes: uuid.MustParse(metricId), Valid: true})
	util.HandleErrorGin(ctx, err)
	err = services.UpdateWayIsCompletedStatus(cc.dbPGX, ctx, removedMetric.WayUuid)
	util.HandleErrorGin(ctx, err)

	ctx.JSON(http.StatusNoContent, gin.H{"status": "successfully deleted"})

}
