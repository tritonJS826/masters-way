package routers

import (
	"mw-training-bff/internal/controllers"

	"github.com/gin-gonic/gin"
)

type trainingRouter struct {
	trainingController *controllers.TrainingController
}

func newTrainingRouter(trainingController *controllers.TrainingController) *trainingRouter {
	return &trainingRouter{trainingController}
}

func (mr *trainingRouter) setTrainingRoutes(rg *gin.RouterGroup) {
	trainings := rg.Group("/trainings")
	trainings.GET("", mr.trainingController.GetTrainingList)
	trainings.GET(":trainingId", mr.trainingController.GetTrainingById)
	trainings.GET(":trainingId/user/:userId", mr.trainingController.GetTrainingListByUser)
	trainings.POST(":trainingId", mr.trainingController.CreateTraining)
	trainings.PATCH(":trainingId", mr.trainingController.UpdateTraining)
	trainings.DELETE(":trainingId", mr.trainingController.DeleteTraining)
}
