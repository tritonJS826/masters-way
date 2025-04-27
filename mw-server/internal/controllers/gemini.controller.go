package controllers

import (
	"mw-server/internal/schemas"
	"mw-server/internal/services"
	"mw-server/pkg/util"
	"net/http"

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
func (cc *GeminiController) GeneratePlansByMetric(ctx *gin.Context) {
	var payload *schemas.AIGeneratePlansByMetricPayload
	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	response, err := cc.geminiService.GeneratePlansByMetric(ctx, payload)
	util.HandleErrorGin(ctx, err)

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
func (cc *GeminiController) CommentIssue(ctx *gin.Context) {
	var payload *schemas.AICommentIssuePayload
	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	response, err := cc.geminiService.CommentIssue(ctx, payload)
	util.HandleErrorGin(ctx, err)

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
func (cc *GeminiController) DecomposeIssue(ctx *gin.Context) {
	var payload *schemas.AIDecomposeIssuePayload
	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	response, err := cc.geminiService.DecomposeIssue(ctx, payload)
	util.HandleErrorGin(ctx, err)

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
func (cc *GeminiController) EstimateIssue(ctx *gin.Context) {
	var payload *schemas.AIEstimateIssuePayload
	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	response, err := cc.geminiService.EstimateIssue(ctx, payload)
	util.HandleErrorGin(ctx, err)

	ctx.JSON(http.StatusOK, response)
}

// Generate topics for training
// @Description Generate topics for training
// @Tags gemini
// @ID ai-topic-for-training
// @Accept  json
// @Produce  json
// @Param request body schemas.AIGenerateTopicsForTrainingPayload true "Request payload"
// @Success 200 {object} schemas.AIGenerateTopicsForTrainingResponse
// @Router /gemini/trainings/topics [post]
func (cc *GeminiController) GenerateTopicsForTraining(ctx *gin.Context) {
	var payload *schemas.AIGenerateTopicsForTrainingPayload
	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	response, err := cc.geminiService.GenerateTopicsForTraining(ctx, payload)
	util.HandleErrorGin(ctx, err)

	ctx.JSON(http.StatusOK, response)
}

// Generate theory material for training
// @Summary Generate theory material for training
// @Description Generate theory material for training
// @Tags gemini
// @ID ai-theory-material-for-topic
// @Accept  json
// @Produce  json
// @Param request body schemas.AIGenerateTheoryMaterialForTrainingPayload true "Request payload"
// @Success 200 {object} schemas.AIGenerateTheoryMaterialForTrainingResponse
// @Router /gemini/trainings/theoryMaterial [post]
func (cc *GeminiController) GenerateTheoryMaterialForTraining(ctx *gin.Context) {
	var payload *schemas.AIGenerateTheoryMaterialForTrainingPayload
	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	response, err := cc.geminiService.GenerateTheoryMaterialForTraining(ctx, payload)
	util.HandleErrorGin(ctx, err)

	ctx.JSON(http.StatusOK, response)
}

// Generate practice material for training
// @Summary Generate practice material for training
// @Description Generate practice material for training
// @Tags gemini
// @ID ai-practice-material-for-topic
// @Accept  json
// @Produce  json
// @Param request body schemas.AIGeneratePracticeMaterialForTrainingPayload true "Request payload"
// @Success 200 {object} schemas.AIGeneratePracticeMaterialsForTrainingResponse
// @Router /gemini/trainings/practiceMaterial [post]
func (cc *GeminiController) GeneratePracticeMaterialForTraining(ctx *gin.Context) {
	var payload *schemas.AIGeneratePracticeMaterialForTrainingPayload
	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	response, err := cc.geminiService.GeneratePracticeMaterialForTraining(ctx, payload)
	util.HandleErrorGin(ctx, err)

	ctx.JSON(http.StatusOK, response)
}
