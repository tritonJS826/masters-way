package routes

import (
	"mwserver/auth"
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
	router.POST("", auth.AuthMiddleware(), cr.problemController.CreateProblem)
	router.PATCH("/:problemId", auth.AuthMiddleware(), cr.problemController.UpdateProblem)
	router.DELETE("/:problemId", auth.AuthMiddleware(), cr.problemController.DeleteProblemById)
}
