package controllers

import (
	"mw-server/internal/auth"
	"mw-server/internal/schemas"
	"mw-server/internal/services"
	"mw-server/pkg/util"
	"net/http"

	"github.com/gin-gonic/gin"
)

type GeminiController struct {
	limitService          *services.LimitService
	geminiService         *services.GeminiService
	profileSettingService *services.ProfileSettingService
}

func NewGeminiController(limitService *services.LimitService, geminiService *services.GeminiService, profileSettingService *services.ProfileSettingService) *GeminiController {
	return &GeminiController{limitService, geminiService, profileSettingService}
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
	userIDRaw, _ := ctx.Get(auth.ContextKeyUserID)
	userID := userIDRaw.(string)

	var payload *schemas.GenerateMetricsPayload
	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	err := gc.limitService.CheckIsLimitReachedByPricingPlan(ctx, &services.LimitReachedParams{
		LimitName: services.NotEnoughCoins,
		UserID:    userID,
	})
	util.HandleErrorGin(ctx, err)

	metrics, err := gc.geminiService.GetMetricsByGoal(ctx, payload)
	util.HandleErrorGin(ctx, err)

	gc.profileSettingService.ReduceCoinsByUserId(ctx, services.ReduceCoinsByUserIdParams{
		UserUuid: userID,
		Coins:    1,
	})

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
func (gc *GeminiController) AIChat(ctx *gin.Context) {
	userIDRaw, _ := ctx.Get(auth.ContextKeyUserID)
	userID := userIDRaw.(string)

	var payload *schemas.AIChatPayload
	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	err := gc.limitService.CheckIsLimitReachedByPricingPlan(ctx, &services.LimitReachedParams{
		LimitName: services.NotEnoughCoins,
		UserID:    userID,
	})
	util.HandleErrorGin(ctx, err)

	response, err := gc.geminiService.AIChat(ctx, payload)
	util.HandleErrorGin(ctx, err)

	gc.profileSettingService.ReduceCoinsByUserId(ctx, services.ReduceCoinsByUserIdParams{
		UserUuid: userID,
		Coins:    1,
	})

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
	userIDRaw, _ := ctx.Get(auth.ContextKeyUserID)
	userID := userIDRaw.(string)

	var payload *schemas.AIGeneratePlansByMetricPayload
	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	err := gc.limitService.CheckIsLimitReachedByPricingPlan(ctx, &services.LimitReachedParams{
		LimitName: services.NotEnoughCoins,
		UserID:    userID,
	})
	util.HandleErrorGin(ctx, err)

	response, err := gc.geminiService.GeneratePlansByMetric(ctx, payload)
	util.HandleErrorGin(ctx, err)

	gc.profileSettingService.ReduceCoinsByUserId(ctx, services.ReduceCoinsByUserIdParams{
		UserUuid: userID,
		Coins:    1,
	})

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
	userIDRaw, _ := ctx.Get(auth.ContextKeyUserID)
	userID := userIDRaw.(string)

	var payload *schemas.AICommentIssuePayload
	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	err := gc.limitService.CheckIsLimitReachedByPricingPlan(ctx, &services.LimitReachedParams{
		LimitName: services.NotEnoughCoins,
		UserID:    userID,
	})
	util.HandleErrorGin(ctx, err)

	response, err := gc.geminiService.CommentIssue(ctx, payload)
	util.HandleErrorGin(ctx, err)

	gc.profileSettingService.ReduceCoinsByUserId(ctx, services.ReduceCoinsByUserIdParams{
		UserUuid: userID,
		Coins:    1,
	})

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
	userIDRaw, _ := ctx.Get(auth.ContextKeyUserID)
	userID := userIDRaw.(string)

	var payload *schemas.AIDecomposeIssuePayload
	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	err := gc.limitService.CheckIsLimitReachedByPricingPlan(ctx, &services.LimitReachedParams{
		LimitName: services.NotEnoughCoins,
		UserID:    userID,
	})
	util.HandleErrorGin(ctx, err)

	response, err := gc.geminiService.DecomposeIssue(ctx, payload)
	util.HandleErrorGin(ctx, err)

	gc.profileSettingService.ReduceCoinsByUserId(ctx, services.ReduceCoinsByUserIdParams{
		UserUuid: userID,
		Coins:    1,
	})

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
	userIDRaw, _ := ctx.Get(auth.ContextKeyUserID)
	userID := userIDRaw.(string)

	var payload *schemas.AIEstimateIssuePayload
	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	err := gc.limitService.CheckIsLimitReachedByPricingPlan(ctx, &services.LimitReachedParams{
		LimitName: services.NotEnoughCoins,
		UserID:    userID,
	})
	util.HandleErrorGin(ctx, err)

	response, err := gc.geminiService.EstimateIssue(ctx, payload)
	util.HandleErrorGin(ctx, err)

	gc.profileSettingService.ReduceCoinsByUserId(ctx, services.ReduceCoinsByUserIdParams{
		UserUuid: userID,
		Coins:    1,
	})

	ctx.JSON(http.StatusOK, response)
}

// @Description Generate training description by test result
// @Tags gemini
// @ID ai-description-for-training-by-test-results
// @Accept  json
// @Produce  json
// @Param request body schemas.AIGenerateTrainingDescriptionByTestResultsPayload true "Request payload"
// @Success 200 {object} schemas.AIGenerateTrainingDescriptionByTestResultsResponse
// @Router /gemini/trainings/description [post]
func (gc *GeminiController) GenerateTrainingDescriptionByTestResults(ctx *gin.Context) {
	userIDRaw, _ := ctx.Get(auth.ContextKeyUserID)
	userID := userIDRaw.(string)

	var payload *schemas.AIGenerateTrainingDescriptionByTestResultsPayload
	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	err := gc.limitService.CheckIsLimitReachedByPricingPlan(ctx, &services.LimitReachedParams{
		LimitName: services.NotEnoughCoins,
		UserID:    userID,
	})
	util.HandleErrorGin(ctx, err)

	response, err := gc.geminiService.GenerateTrainingDescriptionByTestResults(ctx, payload)
	util.HandleErrorGin(ctx, err)

	gc.profileSettingService.ReduceCoinsByUserId(ctx, services.ReduceCoinsByUserIdParams{
		UserUuid: userID,
		Coins:    1,
	})

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
func (gc *GeminiController) GenerateTopicsForTraining(ctx *gin.Context) {
	userIDRaw, _ := ctx.Get(auth.ContextKeyUserID)
	userID := userIDRaw.(string)

	var payload *schemas.AIGenerateTopicsForTrainingPayload
	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	err := gc.limitService.CheckIsLimitReachedByPricingPlan(ctx, &services.LimitReachedParams{
		LimitName: services.NotEnoughCoins,
		UserID:    userID,
	})
	util.HandleErrorGin(ctx, err)

	response, err := gc.geminiService.GenerateTopicsForTraining(ctx, payload)
	util.HandleErrorGin(ctx, err)

	gc.profileSettingService.ReduceCoinsByUserId(ctx, services.ReduceCoinsByUserIdParams{
		UserUuid: userID,
		Coins:    1,
	})

	ctx.JSON(http.StatusOK, response)
}

// Generate theory material for training
// @Summary Generate theory material for training
// @Description Generate theory material for training
// @Tags gemini
// @ID ai-theory-material-for-topic
// @Accept  json
// @Produce  json
// @Param request body schemas.AIGenerateTheoryMaterialForTopicPayload true "Request payload"
// @Success 200 {object} schemas.AIGenerateTheoryMaterialForTopicResponse
// @Router /gemini/trainings/theoryMaterial [post]
func (gc *GeminiController) GenerateTheoryMaterialForTopic(ctx *gin.Context) {
	userIDRaw, _ := ctx.Get(auth.ContextKeyUserID)
	userID := userIDRaw.(string)

	var payload *schemas.AIGenerateTheoryMaterialForTopicPayload
	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	err := gc.limitService.CheckIsLimitReachedByPricingPlan(ctx, &services.LimitReachedParams{
		LimitName: services.NotEnoughCoins,
		UserID:    userID,
	})
	util.HandleErrorGin(ctx, err)

	response, err := gc.geminiService.GenerateTheoryMaterialForTopic(ctx, payload)
	util.HandleErrorGin(ctx, err)

	gc.profileSettingService.ReduceCoinsByUserId(ctx, services.ReduceCoinsByUserIdParams{
		UserUuid: userID,
		Coins:    1,
	})

	ctx.JSON(http.StatusOK, response)
}

// Generate practice material for training
// @Summary Generate practice material for training
// @Description Generate practice material for training
// @Tags gemini
// @ID ai-practice-material-for-topic
// @Accept  json
// @Produce  json
// @Param request body schemas.AIGeneratePracticeMaterialForTopicPayload true "Request payload"
// @Success 200 {object} schemas.AIGeneratePracticeMaterialsForTopicResponse
// @Router /gemini/trainings/practiceMaterial [post]
func (gc *GeminiController) GeneratePracticeMaterialForTopic(ctx *gin.Context) {
	userIDRaw, _ := ctx.Get(auth.ContextKeyUserID)
	userID := userIDRaw.(string)

	var payload *schemas.AIGeneratePracticeMaterialForTopicPayload
	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	err := gc.limitService.CheckIsLimitReachedByPricingPlan(ctx, &services.LimitReachedParams{
		LimitName: services.NotEnoughCoins,
		UserID:    userID,
	})
	util.HandleErrorGin(ctx, err)

	response, err := gc.geminiService.GeneratePracticeMaterialForTopic(ctx, payload)
	util.HandleErrorGin(ctx, err)

	gc.profileSettingService.ReduceCoinsByUserId(ctx, services.ReduceCoinsByUserIdParams{
		UserUuid: userID,
		Coins:    1,
	})

	ctx.JSON(http.StatusOK, response)
}

// Generate questions test
// @Summary Generate questions test
// @Description Generate questions test
// @Tags gemini
// @ID ai-questions-for-test
// @Accept  json
// @Produce  json
// @Param request body schemas.AIGenerateQuestionsForTestPayload true "Request payload"
// @Success 200 {object} schemas.AIGenerateQuestionsForTestResponse
// @Router /gemini/test/questions [post]
func (gc *GeminiController) GenerateQuestionsForTest(ctx *gin.Context) {
	userIDRaw, _ := ctx.Get(auth.ContextKeyUserID)
	userID := userIDRaw.(string)

	var payload *schemas.AIGenerateQuestionsForTestPayload
	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	err := gc.limitService.CheckIsLimitReachedByPricingPlan(ctx, &services.LimitReachedParams{
		LimitName: services.NotEnoughCoins,
		UserID:    userID,
	})
	util.HandleErrorGin(ctx, err)

	response, err := gc.geminiService.GenerateQuestionsForTest(ctx, payload)
	util.HandleErrorGin(ctx, err)

	gc.profileSettingService.ReduceCoinsByUserId(ctx, services.ReduceCoinsByUserIdParams{
		UserUuid: userID,
		Coins:    1,
	})

	ctx.JSON(http.StatusOK, response)
}

// @Summary Generate questionResult
// @Description Generate questionResult
// @Tags gemini
// @ID ai-question-result
// @Accept  json
// @Produce  json
// @Param request body schemas.AIGenerateQuestionResultPayload true "Request payload"
// @Success 200 {object} schemas.AIGenerateQuestionResultResponse
// @Router /gemini/test/questionResult [post]
func (gc *GeminiController) AiGenerateQuestionResult(ctx *gin.Context) {
	userIDRaw, _ := ctx.Get(auth.ContextKeyUserID)
	userID := userIDRaw.(string)

	var payload *schemas.AIGenerateQuestionResultPayload
	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	err := gc.limitService.CheckIsLimitReachedByPricingPlan(ctx, &services.LimitReachedParams{
		LimitName: services.NotEnoughCoins,
		UserID:    userID,
	})
	util.HandleErrorGin(ctx, err)

	response, err := gc.geminiService.GenerateQuestionResult(ctx, payload)
	util.HandleErrorGin(ctx, err)

	gc.profileSettingService.ReduceCoinsByUserId(ctx, services.ReduceCoinsByUserIdParams{
		UserUuid: userID,
		Coins:    1,
	})

	ctx.JSON(http.StatusOK, response)
}
