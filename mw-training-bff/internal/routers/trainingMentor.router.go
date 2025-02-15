package routers

import (
	"mw-training-bff/internal/controllers"

	"github.com/gin-gonic/gin"
)

type trainingMentorRouter struct {
	trainingMentorController *controllers.TrainingMentorController
}

func newTrainingMentorRouter(trainingMentorController *controllers.TrainingMentorController) *trainingMentorRouter {
	return &trainingMentorRouter{trainingMentorController}
}

func (mr *trainingMentorRouter) setTrainingMentorRoutes(rg *gin.RouterGroup) {
	trainingMentors := rg.Group("/trainingMentors")
	trainingMentors.POST(":trainingId/user/:userId", mr.trainingMentorController.CreateMentor)
	trainingMentors.DELETE(":trainingId/user/:mentorId", mr.trainingMentorController.DeleteMentor)
}
