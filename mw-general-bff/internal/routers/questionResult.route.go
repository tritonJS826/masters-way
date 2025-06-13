package routers

import (
	"mw-general-bff/internal/auth"
	"mw-general-bff/internal/config"
	"mw-general-bff/internal/controllers"

	"github.com/gin-gonic/gin"
)

type questionResultRouter struct {
	questionResultController *controllers.QuestionResultController
	config                   *config.Config
}

func newQuestionResultRouter(questionResultController *controllers.QuestionResultController, config *config.Config) *questionResultRouter {
	return &questionResultRouter{questionResultController, config}
}

func (mr *questionResultRouter) setQuestionResultRouter(rg *gin.RouterGroup) {
	router := rg.Group("questionResult", auth.HandleHeaders(mr.config))
	{
		router.POST("/createAndCheck", mr.questionResultController.CreateAndCheckQuestionResult)
	}
}
