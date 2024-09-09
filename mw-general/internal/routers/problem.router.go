package routers

import (
	"mwserver/internal/auth"
	"mwserver/internal/config"
	"mwserver/internal/controllers"

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
	router := rg.Group("problems")
	router.POST("", auth.AuthMiddleware(pr.config), pr.problemController.CreateProblem)
	router.PATCH("/:problemId", auth.AuthMiddleware(pr.config), pr.problemController.UpdateProblem)
	router.DELETE("/:problemId", auth.AuthMiddleware(pr.config), pr.problemController.DeleteProblemById)
}
