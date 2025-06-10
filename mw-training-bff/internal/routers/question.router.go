package routers

import (
	"mw-training-bff/internal/auth"
	"mw-training-bff/internal/config"
	"mw-training-bff/internal/controllers"

	"github.com/gin-gonic/gin"
)

type questionRouter struct {
	questionController *controllers.QuestionController
	config             *config.Config
}

func newQuestionRouter(questionController *controllers.QuestionController, config *config.Config) *questionRouter {
	return &questionRouter{questionController, config}
}

func (qR *questionRouter) setQuestionRoutes(rg *gin.RouterGroup) {
	questions := rg.Group("/question", auth.HandleHeaders())
	questions.POST("", qR.questionController.CreateQuestion)
	questions.PATCH(":questionId", qR.questionController.UpdateQuestion)
	questions.DELETE(":questionId", qR.questionController.DeleteQuestion)
}
