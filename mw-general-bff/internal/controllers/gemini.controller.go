package controllers

import (
	"mw-general-bff/internal/facades"
	"mw-general-bff/internal/schemas"
	"mw-general-bff/pkg/utils"
	"net/http"

	"github.com/gin-gonic/gin"
)

type GeminiController struct {
	geminiFacade *facades.GeminiFacade
}

func NewGeminiController(geminiFacade *facades.GeminiFacade) *GeminiController {
	return &GeminiController{geminiFacade}
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
func (gc *GeminiController) GenerateMetrics(ctx *gin.Context) {
	var payload schemas.GenerateMetricsPayload
	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	response, err := gc.geminiFacade.CreateMetricsPrompt(ctx, &payload)
	utils.HandleErrorGin(ctx, err)

	ctx.JSON(http.StatusOK, response)
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
func (gc *GeminiController) AIChat(ctx *gin.Context) {
	var payload schemas.AIChatPayload
	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	response, err := gc.geminiFacade.AIChat(ctx, &payload)
	utils.HandleErrorGin(ctx, err)

	ctx.JSON(http.StatusOK, response)
}

// Generate plans by metric
// @Summary Generate plans by metric
// @Description Generate plans by metric.
// @Tags gemini
// @ID ai-plans-by-metrics
// @Accept  json
// @Produce  json
// @Param request body schemas.AIGeneratePlansByMetricPayload true "Request payload"
// @Success 200 {object} schemas.AIGeneratePlansByMetricResponse
// @Router /gemini/generate-plans-by-metric [post]
func (gc *GeminiController) GeneratePlansByMetric(ctx *gin.Context) {
	var payload *schemas.AIGeneratePlansByMetricPayload
	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	response, err := gc.geminiFacade.GeneratePlansByMetric(ctx, payload)
	utils.HandleErrorGin(ctx, err)

	ctx.JSON(http.StatusOK, response)
}

// Generate a comment for any issue
// @Summary Generate a comment for any issue
// @Description Generate a comment for any issue
// @Tags gemini
// @ID ai-comment-issue
// @Accept  json
// @Produce  json
// @Param request body schemas.AICommentIssuePayload true "Request payload"
// @Success 200 {object} schemas.AICommentIssueResponse
// @Router /gemini/comment-issue [post]
func (gc *GeminiController) CommentIssue(ctx *gin.Context) {
	var payload schemas.AICommentIssuePayload
	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	response, err := gc.geminiFacade.CommentIssue(ctx, &payload)
	utils.HandleErrorGin(ctx, err)

	ctx.JSON(http.StatusOK, response)
}

// Decompose issue
// @Summary Decompose issue
// @Description Decompose issue for 10 plans
// @Tags gemini
// @ID ai-decompose-issue
// @Accept  json
// @Produce  json
// @Param request body schemas.AIDecomposeIssuePayload true "Request payload"
// @Success 200 {object} schemas.AIDecomposeIssueResponse
// @Router /gemini/decompose-issue [post]
func (gc *GeminiController) DecomposeIssue(ctx *gin.Context) {
	var payload *schemas.AIDecomposeIssuePayload
	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	response, err := gc.geminiFacade.DecomposeIssue(ctx, payload)
	utils.HandleErrorGin(ctx, err)

	ctx.JSON(http.StatusOK, response)
}

// Estimate issue in minutes
// @Summary Estimate issue in minutes
// @Description Estimate issue in minutes
// @Tags gemini
// @ID ai-estimate-issue
// @Accept  json
// @Produce  json
// @Param request body schemas.AIEstimateIssuePayload true "Request payload"
// @Success 200 {object} schemas.AIEstimateIssueResponse
// @Router /gemini/estimate-issue [post]
func (gc *GeminiController) EstimateIssue(ctx *gin.Context) {
	var payload *schemas.AIEstimateIssuePayload
	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	response, err := gc.geminiFacade.EstimateIssue(ctx, payload)
	utils.HandleErrorGin(ctx, err)

	ctx.JSON(http.StatusOK, response)
}
