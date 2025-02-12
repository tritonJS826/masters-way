package routers

import (
	"mw-training-bff/internal/auth"
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
	trainings.POST("", auth.HandleHeaders(), mr.trainingController.CreateTraining)
	trainings.GET(":trainingId", mr.trainingController.GetTrainingById)
	trainings.PATCH(":trainingId", auth.HandleHeaders(), mr.trainingController.UpdateTraining)
	trainings.DELETE(":trainingId", auth.HandleHeaders(), mr.trainingController.DeleteTraining)

	trainings.GET("/users/:userId", mr.trainingController.GetTrainingListByUser)
}
