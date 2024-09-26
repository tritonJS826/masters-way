package routers

import (
	"mwgeneral/internal/auth"
	"mwgeneral/internal/config"
	"mwgeneral/internal/controllers"

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
	router := rg.Group("userTags")
	router.POST("", auth.AuthMiddleware(ur.config), ur.userTagController.AddUserTagByName)
	router.DELETE("/:userTagId/:userId", auth.AuthMiddleware(ur.config), ur.userTagController.DeleteUserTagByFromUserByTag)
}
