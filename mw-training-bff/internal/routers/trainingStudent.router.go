package routers

import (
	"mw-training-bff/internal/controllers"

	"github.com/gin-gonic/gin"
)

type trainingStudentRouter struct {
	trainingStudentController *controllers.TrainingStudentController
}

func newTrainingStudentRouter(trainingStudentController *controllers.TrainingStudentController) *trainingStudentRouter {
	return &trainingStudentRouter{trainingStudentController}
}

func (mr *trainingStudentRouter) setTrainingStudentRoutes(rg *gin.RouterGroup) {
	trainingStudents := rg.Group("/trainingStudents")
	trainingStudents.POST(":trainingId/user/:userId", mr.trainingStudentController.CreateStudent)
	trainingStudents.DELETE(":trainingId/user/:studentId", mr.trainingStudentController.DeleteStudent)
}
