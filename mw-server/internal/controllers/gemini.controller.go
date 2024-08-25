package controllers

import (
	"net/http"

	"mwserver/internal/services"
	"mwserver/schemas"

	"mwserver/util"

	"github.com/gin-gonic/gin"
)

type GeminiController struct {
	geminiService *services.GeminiService
}

func NewGeminiController(geminiService *services.GeminiService) *GeminiController {
	return &GeminiController{geminiService}
}

// Generate metrics handler
// @Summary Generate metrics using Gemini
// @Description This endpoint uses Gemini to generate metrics by analyzing the provided goals.
// @Tags gemini
// @ID generate-metrics
// @Accept  json
// @Produce  json
// @Param request body schemas.GenerateMetricsPayload true "Request payload"
// @Success 200 {object} schemas.GenerateMetricsResponse
// @Router /gemini/metrics [post]
func (cc *GeminiController) GenerateMetrics(ctx *gin.Context) {
	var payload *schemas.GenerateMetricsPayload
	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	metrics, err := cc.geminiService.GetMetricsByGoal(ctx, payload)
	util.HandleErrorGin(ctx, err)

	ctx.JSON(http.StatusOK, schemas.GenerateMetricsResponse{Metrics: &metrics})
}

// Just chat with AI
// @Summary Just chat with AI
// @Description This endpoint for talks with AI language model.
// @Tags gemini
// @ID ai-chat
// @Accept  json
// @Produce  json
// @Param request body schemas.AIChatPayload true "Request payload"
// @Success 200 {object} schemas.AIChatResponse
// @Router /gemini/just-chat [post]
func (cc *GeminiController) AIChat(ctx *gin.Context) {
	var payload *schemas.AIChatPayload
	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	response, err := cc.geminiService.AIChat(ctx, payload)
	util.HandleErrorGin(ctx, err)

	ctx.JSON(http.StatusOK, response)
}
