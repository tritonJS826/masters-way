package routers

import (
	"mw-server/internal/auth"
	"mw-server/internal/config"
	"mw-server/internal/controllers"

	"github.com/gin-gonic/gin"
)

type userContactRouter struct {
	userContactController *controllers.UserContactController
	config                *config.Config
}

func newUserContactRouter(userController *controllers.UserContactController, config *config.Config) *userContactRouter {
	return &userContactRouter{userController, config}
}

func (ur *userContactRouter) setUserContactRoutes(rg *gin.RouterGroup) {
	router := rg.Group("users/:userId/contacts")
	router.POST("", auth.AuthMiddleware(ur.config), ur.userContactController.CreateUserContact)
	router.PATCH("/:contactId", auth.AuthMiddleware(ur.config), ur.userContactController.UpdateUserContact)
	router.DELETE("/:contactId", auth.AuthMiddleware(ur.config), ur.userContactController.DeleteUserContact)
}
