package controllers

import (
	"mw-training-bff/internal/auth"
	"mw-training-bff/internal/schemas"
	"mw-training-bff/internal/services"
	util "mw-training-bff/internal/utils"
	"net/http"

	"github.com/gin-gonic/gin"
)

type QuestionResultController struct {
	generalService        *services.GeneralService
	questionResultService *services.QuestionResultService
}

func NewQuestionResultController(generalService *services.GeneralService, questionResultService *services.QuestionResultService) *QuestionResultController {
	return &QuestionResultController{generalService, questionResultService}
}

// @Summary Create question result
// @Description
// @Tags questionResult
// @ID create-question-result
// @Accept json
// @Produce json
// @Param request body schemas.CreateQuestionResultRequest true "query params"
// @Success 200 {object} schemas.QuestionResult
// @Router /questionResult [post]
func (tc *QuestionResultController) CreateQuestionResult(ctx *gin.Context) {
	userUUID := ctx.Value(auth.ContextKeyUserID).(string)

	var payload *schemas.CreateQuestionResultRequest
	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "Failed payload", "error": err.Error()})
		return
	}

	args := &services.CreateQuestionResultParams{
		SessionUuid:       payload.TestSessionUUID,
		QuestionUuid:      payload.QuestionUUID,
		UserUuid:          userUUID,
		ResultDescription: payload.ResultDescription,
		IsCorrect:         payload.IsOk,
		TestUuid:          payload.TestUUID,
		UserAnswer:        payload.UserAnswer,
	}

	questionResult, err := tc.questionResultService.CreateQuestionResult(ctx, args)
	util.HandleErrorGin(ctx, err)

	ctx.JSON(http.StatusOK, questionResult)
}

// @Summary Get question results by session UUID
// @Description
// @Tags questionResult
// @ID get-question-results-by-session-uuid
// @Accept json
// @Produce json
// @Param sessionId path string true "session id"
// @Success 200 {array} schemas.QuestionResult
// @Router /questionResult/session/{sessionId} [get]
func (tc *QuestionResultController) GetQuestionResultsBySessionUuid(ctx *gin.Context) {
	userUUID := ctx.Value(auth.ContextKeyUserID).(string)
	sessionId := ctx.Param("sessionId")

	args := &services.GetQuestionResultsBySessionUuidParams{
		SessionUuid: sessionId,
		UserUuid:    userUUID,
	}

	questionResults, err := tc.questionResultService.GetQuestionResultsBySessionUuid(ctx, args)
	util.HandleErrorGin(ctx, err)

	ctx.JSON(http.StatusOK, questionResults)
}
