package routers

import (
	"mw-general-bff/internal/auth"
	"mw-general-bff/internal/config"
	"mw-general-bff/internal/controllers"

	"github.com/gin-gonic/gin"
)

type userTagRouter struct {
	userTagController *controllers.UserTagController
	config            *config.Config
}

func newUserTagRouter(userTagController *controllers.UserTagController, config *config.Config) *userTagRouter {
	return &userTagRouter{userTagController, config}
}

func (ur *userTagRouter) setUserTagRoutes(rg *gin.RouterGroup) {
	router := rg.Group("userTags", auth.HandleHeaders(ur.config))
	{
		router.POST("", ur.userTagController.AddUserTagByName)
		router.DELETE("/:userTagId/:userId", ur.userTagController.DeleteUserTagByFromUserByTag)
	}
}
