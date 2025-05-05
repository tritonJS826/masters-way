package routers

import (
	"mw-general-bff/internal/auth"
	"mw-general-bff/internal/config"
	"mw-general-bff/internal/controllers"

	"github.com/gin-gonic/gin"
)

type userContactRouter struct {
	userContactController *controllers.UserContactController
	config                *config.Config
}

func newUserContactRouter(userContactController *controllers.UserContactController, config *config.Config) *userContactRouter {
	return &userContactRouter{userContactController, config}
}

func (ur *userContactRouter) setUserContactRoutes(rg *gin.RouterGroup) {
	router := rg.Group("users/:userId/contacts")
	router.POST("", auth.HandleHeaders(ur.config), ur.userContactController.CreateUserContact)
	router.PATCH("/:contactId", auth.HandleHeaders(ur.config), ur.userContactController.UpdateUserContact)
	router.DELETE("/:contactId", auth.HandleHeaders(ur.config), ur.userContactController.DeleteUserContact)
}
