package controllers

import (
	"mw-training-bff/internal/auth"
	"mw-training-bff/internal/schemas"
	"mw-training-bff/internal/services"
	util "mw-training-bff/internal/utils"
	"net/http"

	"github.com/gin-gonic/gin"
)

// Without next lines swagger does not see openapi models
var _ = &schemas.CreateQuestionPayload{}

type QuestionController struct {
	generalService  *services.GeneralService
	questionService *services.QuestionService
}

func NewQuestionController(generalService *services.GeneralService, questionService *services.QuestionService) *QuestionController {
	return &QuestionController{generalService, questionService}
}

// @Summary Create question
// @Description
// @Tags question
// @ID create-question
// @Accept json
// @Produce json
// @Param request body schemas.CreateQuestionPayload true "query params"
// @Success 200 {object} schemas.Question
// @Router /question [post]
func (tc *QuestionController) CreateQuestion(ctx *gin.Context) {
	userUUID := ctx.Value(auth.ContextKeyUserID).(string)

	var payload *schemas.CreateQuestionPayload
	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "Failed payload", "error": err.Error()})
		return
	}

	args := &services.CreateQuestionParams{
		TestUuid:     payload.TestUUID,
		UserUuid:     userUUID,
		Name:         payload.Name,
		QuestionText: payload.QuestionText,
		TimeToAnswer: payload.TimeToAnswer,
		Answer:       payload.Answer,
		PracticeType: payload.PracticeType,
	}

	question, err := tc.questionService.CreateQuestion(ctx, args)
	util.HandleErrorGin(ctx, err)

	ctx.JSON(http.StatusOK, question)
}

// @Summary Update question by uuid
// @Description
// @Tags question
// @ID update-question
// @Accept json
// @Produce json
// @Param request body schemas.UpdateQuestionPayload true "query params"
// @Param questionId path string true "topic id"
// @Success 200 {object} schemas.Question
// @Router /question/{questionId} [patch]
func (tc *QuestionController) UpdateQuestion(ctx *gin.Context) {
	userUUID := ctx.Value(auth.ContextKeyUserID).(string)
	var payload *schemas.UpdateQuestionPayload
	questionId := ctx.Param("questionId")

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "Failed payload", "error": err.Error()})
		return
	}

	args := &services.UpdateQuestionParams{
		QuestionUUID: questionId,
		UserUUID:     userUUID,
		Name:         payload.Name,
		QuestionText: payload.QuestionText,
		TimeToAnswer: payload.TimeToAnswer,
		Answer:       payload.Answer,
		PracticeType: payload.PracticeType,
		Order:        payload.Order,
	}
	question, err := tc.questionService.UpdateQuestion(ctx, args)
	util.HandleErrorGin(ctx, err)

	ctx.JSON(http.StatusOK, question)
}

// @Summary Delete question by Uuid
// @Description
// @Tags question
// @ID delete-question
// @Accept json
// @Produce json
// @Param questionId path string true "question id"
// @Success 200
// @Router /question/{questionId} [delete]
func (tc *QuestionController) DeleteQuestion(ctx *gin.Context) {
	userUUID := ctx.Value(auth.ContextKeyUserID).(string)
	questionId := ctx.Param("questionId")

	args := &services.DeleteQuestionParams{
		QuestionUuid: questionId,
		UserUuid:     userUUID,
	}
	err := tc.questionService.DeleteQuestion(ctx, args)
	util.HandleErrorGin(ctx, err)

	ctx.Status(http.StatusOK)
}
