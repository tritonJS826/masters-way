package routers

import (
	"mw-general-bff/internal/auth"
	"mw-general-bff/internal/config"
	"mw-general-bff/internal/controllers"

	"github.com/gin-gonic/gin"
)

type problemRouter struct {
	problemController *controllers.ProblemController
	config            *config.Config
}

func newProblemRouter(problemController *controllers.ProblemController, config *config.Config) *problemRouter {
	return &problemRouter{problemController, config}
}

func (pr *problemRouter) setProblemRoutes(rg *gin.RouterGroup) {
	router := rg.Group("problems", auth.HandleHeaders(pr.config))
	{
		router.POST("", pr.problemController.CreateProblem)
		router.PATCH("/:problemId", pr.problemController.UpdateProblem)
		router.DELETE("/:problemId", pr.problemController.DeleteProblemById)
	}
}
