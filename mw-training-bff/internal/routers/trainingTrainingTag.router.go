package routers

import (
	"mw-training-bff/internal/controllers"

	"github.com/gin-gonic/gin"
)

type trainingTrainingTagRouter struct {
	trainingTrainingTagController *controllers.TrainingTrainingTagController
}

func newTrainingTrainingTagRouter(trainingTrainingTagController *controllers.TrainingTrainingTagController) *trainingTrainingTagRouter {
	return &trainingTrainingTagRouter{trainingTrainingTagController}
}

func (mr *trainingTrainingTagRouter) setTrainingTrainingTagRoutes(rg *gin.RouterGroup) {
	trainingTrainingTags := rg.Group("/trainingTrainingTags")
	trainingTrainingTags.POST(":trainingId", mr.trainingTrainingTagController.CreateTrainingTag)
	trainingTrainingTags.DELETE(":trainingId/trainingTag/:trainingTagName", mr.trainingTrainingTagController.DeleteTrainingTag)
}
