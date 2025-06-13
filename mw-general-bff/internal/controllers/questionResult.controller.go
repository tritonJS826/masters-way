package controllers

import (
	"mw-general-bff/internal/auth"
	"mw-general-bff/internal/facades"
	"mw-general-bff/internal/schemas"
	"mw-general-bff/pkg/utils"
	"net/http"

	"github.com/gin-gonic/gin"
)

type QuestionResultController struct {
	questionResultFacade *facades.QuestionResultFacade
}

func NewQuestionResultController(questionResultFacade *facades.QuestionResultFacade) *QuestionResultController {
	return &QuestionResultController{questionResultFacade}
}

// @Summary Create and check question result
// @Description Create and check question result
// @Tags questionResult
// @ID create-and-check-question-result
// @Accept  json
// @Produce  json
// @Param request body schemas.CreateQuestionResultRequest true "query params"
// @Success 200 {object} schemas.QuestionResult
// @Router /questionResult/createAndCheck [post]
func (cc *QuestionResultController) CreateAndCheckQuestionResult(ctx *gin.Context) {
	var payload *schemas.CreateQuestionResultRequest
	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	userIdRaw, _ := ctx.Get(auth.ContextKeyUserID)
	userId := userIdRaw.(string)

	response, err := cc.questionResultFacade.CreateAndCheckQuestionResult(ctx, payload, userId)
	utils.HandleErrorGin(ctx, err)

	ctx.JSON(http.StatusOK, response)
}
