package routes

import (
	"mwserver/controllers"

	"github.com/gin-gonic/gin"
)

type ProblemRoutes struct {
	problemController controllers.ProblemController
}

func NewRouteProblem(problemController controllers.ProblemController) ProblemRoutes {
	return ProblemRoutes{problemController}
}

func (cr *ProblemRoutes) ProblemRoute(rg *gin.RouterGroup) {
	router := rg.Group("problems")
	router.POST("", cr.problemController.CreateProblem)
	router.PATCH("/:problemId", cr.problemController.UpdateProblem)
	router.DELETE("/:problemId", cr.problemController.DeleteProblemById)
}
