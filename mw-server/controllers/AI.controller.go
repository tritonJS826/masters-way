package controllers

import (
	"context"
	"net/http"

	"mwserver/schemas"
	"mwserver/services"

	"github.com/gin-gonic/gin"
)

type AIController struct {
	ctx context.Context
}

func NewAIController(ctx context.Context) *AIController {
	return &AIController{ctx}
}

// Generate metrics handler
// @Summary Generate AI-based metrics
// @Description This endpoint uses AI to generate metrics by analyzing the provided goals
// @Tags AI
// @ID generate-metrics
// @Accept  json
// @Produce  json
// @Param request body schemas.GenerateMetricsPayload true "Request payload"
// @Success 200 {object} schemas.AIResponse
// @Router /ai/metrics [post]
func (cc *AIController) GenerateMetrics(ctx *gin.Context) {
	var payload schemas.GenerateMetricsPayload
	err := ctx.BindJSON(&payload)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	message, err := services.GetMetricsByGoal(ctx, &payload)
	response := &schemas.AIResponse{
		Answer: message,
	}

	ctx.JSON(http.StatusOK, response)
}
