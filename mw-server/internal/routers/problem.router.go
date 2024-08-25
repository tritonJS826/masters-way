package routers

import (
	"mwserver/auth"
	"mwserver/internal/controllers"

	"github.com/gin-gonic/gin"
)

type ProblemRouter struct {
	problemController *controllers.ProblemController
}

func NewProblemRouter(problemController *controllers.ProblemController) *ProblemRouter {
	return &ProblemRouter{problemController}
}

func (pr *ProblemRouter) setProblemRoutes(rg *gin.RouterGroup) {
	router := rg.Group("problems")
	router.POST("", auth.AuthMiddleware(), pr.problemController.CreateProblem)
	router.PATCH("/:problemId", auth.AuthMiddleware(), pr.problemController.UpdateProblem)
	router.DELETE("/:problemId", auth.AuthMiddleware(), pr.problemController.DeleteProblemById)
}
