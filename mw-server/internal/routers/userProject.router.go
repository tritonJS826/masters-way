package routers

import (
	"mw-server/internal/auth"
	"mw-server/internal/config"
	"mw-server/internal/controllers"

	"github.com/gin-gonic/gin"
)

type userProjectRouter struct {
	userProjectController *controllers.UserProjectController
	config                *config.Config
}

func newUserProjectRouter(userProjectController *controllers.UserProjectController, config *config.Config) *userProjectRouter {
	return &userProjectRouter{userProjectController, config}
}

func (ur *userProjectRouter) setUserProjectRoutes(rg *gin.RouterGroup) {
	router := rg.Group("userProjects", auth.AuthMiddleware(ur.config))
	router.POST("", ur.userProjectController.CreateUsersProject)
	router.DELETE("/:projectId/:userId", ur.userProjectController.DeleteUserProject)
}
