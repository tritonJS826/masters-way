package routers

import (
	"mwserver/internal/auth"
	"mwserver/internal/config"
	"mwserver/internal/controllers"

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
	router.GET("/user/:userId", mr.projectController.GetProjectsByUserID)
	router.GET("/:projectId", mr.projectController.GetProjectByID)
	router.POST("", mr.projectController.CreateProject)
	router.PATCH("/:projectId", mr.projectController.UpdateProject)
	router.DELETE("/:projectId", mr.projectController.DeleteProject)
}
