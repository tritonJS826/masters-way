package controllers

import (
	"mw-general-bff/internal/schemas"
	"mw-general-bff/internal/services"
	"mw-general-bff/pkg/utils"
	"net/http"

	"github.com/gin-gonic/gin"
)

type MetricController struct {
	generalService *services.GeneralService
}

func NewMetricController(generalService *services.GeneralService) *MetricController {
	return &MetricController{generalService}
}

// Create Metric  handler
// @Summary Create a new metric
// @Description
// @Tags metric
// @ID create-metric
// @Accept  json
// @Produce  json
// @Param request body schemas.CreateMetricPayload true "query params"
// @Success 200 {object} openapiGeneral.MwserverInternalSchemasMetricResponse
// @Router /metrics [post]
func (mc *MetricController) CreateMetric(ctx *gin.Context) {
	var payload *schemas.CreateMetricPayload

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "Failed payload", "error": err.Error()})
		return
	}

	metric, err := mc.generalService.CreateMetric(ctx, payload)
	utils.HandleErrorGin(ctx, err)

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
// @Success 200 {object} openapiGeneral.MwserverInternalSchemasMetricResponse
// @Router /metrics/{metricId} [patch]
func (mc *MetricController) UpdateMetric(ctx *gin.Context) {
	var payload *schemas.UpdateMetricPayload
	metricID := ctx.Param("metricId")

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "Failed payload", "error": err.Error()})
		return
	}

	metric, err := mc.generalService.UpdateMetric(ctx, &services.UpdateMetricParams{
		MetricID:         metricID,
		Description:      payload.Description,
		IsDone:           payload.IsDone,
		MetricEstimation: payload.MetricEstimation,
	})
	utils.HandleErrorGin(ctx, err)

	ctx.JSON(http.StatusOK, metric)
}

// Deleting Metric handlers
// @Summary Delete metric by UUID
// @Description
// @Tags metric
// @ID delete-metric
// @Accept  json
// @Produce  json
// @Param metricId path string true "metric ID"
// @Success 204
// @Router /metrics/{metricId} [delete]
func (mc *MetricController) DeleteMetricById(ctx *gin.Context) {
	metricID := ctx.Param("metricId")

	err := mc.generalService.DeleteMetricById(ctx, metricID)
	utils.HandleErrorGin(ctx, err)

	ctx.Status(http.StatusNoContent)
}
