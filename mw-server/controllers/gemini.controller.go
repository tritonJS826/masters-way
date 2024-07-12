package controllers

import (
	"context"
	"net/http"

	"mwserver/schemas"
	"mwserver/services"
	"mwserver/util"

	"github.com/gin-gonic/gin"
)

type GeminiController struct {
	ctx context.Context
	gs  *services.GeminiService
}

func NewGeminiController(ctx context.Context, gs *services.GeminiService) *GeminiController {
	return &GeminiController{ctx, gs}
}

// Generate metrics handler
// @Summary Generate metrics using Gemini
// @Description This endpoint uses Gemini to generate metrics by analyzing the provided goals.
// @Tags gemini
// @ID generate-metrics
// @Accept  json
// @Produce  json
// @Param request body schemas.GenerateMetricsPayload true "Request payload"
// @Success 200 {array} string "List of generated metrics"
// @Router /gemini/metrics [post]
func (gc *GeminiController) GenerateMetrics(ctx *gin.Context) {
	var payload schemas.GenerateMetricsPayload
	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	metrics, err := gc.gs.GetMetricsByGoal(ctx, &payload)
	util.HandleErrorGin(ctx, err)

	ctx.JSON(http.StatusOK, metrics)
}
