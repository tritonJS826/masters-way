package routers

import (
	"mw-training-bff/internal/auth"
	"mw-training-bff/internal/config"
	"mw-training-bff/internal/controllers"

	"github.com/gin-gonic/gin"
)

type questionResultRouter struct {
	questionResultController *controllers.QuestionResultController
	config                   *config.Config
}

func newQuestionResultRouter(questionResultController *controllers.QuestionResultController, config *config.Config) *questionResultRouter {
	return &questionResultRouter{questionResultController, config}
}

func (qR *questionResultRouter) setQuestionResultRoutes(rg *gin.RouterGroup) {
	questionResults := rg.Group("/questionResult", auth.HandleHeaders())
	questionResults.POST("", qR.questionResultController.CreateQuestionResult)
	questionResults.PATCH("/session/:sessionId", qR.questionResultController.GetQuestionResultsBySessionUuid)
}
