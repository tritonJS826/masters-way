package routers

import (
	"mw-training-bff/internal/auth"
	"mw-training-bff/internal/config"
	"mw-training-bff/internal/controllers"

	"github.com/gin-gonic/gin"
)

type trainingTestRouter struct {
	trainingTestController *controllers.TrainingTestsController
	config                 *config.Config
}

func newTrainingTestRouter(trainingTestController *controllers.TrainingTestsController, config *config.Config) *trainingTestRouter {
	return &trainingTestRouter{trainingTestController, config}
}

func (qR *trainingTestRouter) setTrainingTestRoutes(rg *gin.RouterGroup) {
	questions := rg.Group("/trainingTest")
	questions.POST("", auth.HandleHeaders(), qR.trainingTestController.CreateTrainingTest)
}
