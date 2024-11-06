package routers

import (
	"mw-general-bff/internal/auth"
	"mw-general-bff/internal/config"
	"mw-general-bff/internal/controllers"

	"github.com/gin-gonic/gin"
)

type projectRouter struct {
	projectController *controllers.ProjectController
	config            *config.Config
}

func newProjectRouter(projectController *controllers.ProjectController, config *config.Config) *projectRouter {
	return &projectRouter{projectController, config}
}

func (mr *projectRouter) setProjectRouter(rg *gin.RouterGroup) {
	router := rg.Group("projects", auth.AuthMiddleware(mr.config))
	router.GET("/:projectId", mr.projectController.GetProjectByID)
	router.POST("", mr.projectController.CreateProject)
	router.PATCH("/:projectId", mr.projectController.UpdateProject)
	router.DELETE("/:projectId", mr.projectController.DeleteProject)
}
