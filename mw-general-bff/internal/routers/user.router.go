package routers

import (
	"mw-general-bff/internal/auth"
	"mw-general-bff/internal/config"
	"mw-general-bff/internal/controllers"

	"github.com/gin-gonic/gin"
)

type userRouter struct {
	userController *controllers.UserController
	config         *config.Config
}

func newUserRouter(userController *controllers.UserController, config *config.Config) *userRouter {
	return &userRouter{userController, config}
}

func (ur *userRouter) setUserRoutes(rg *gin.RouterGroup) {
	router := rg.Group("users")
	{
		router.GET("", ur.userController.GetAllUsers)
		router.GET("/:userId", ur.userController.GetUserById)
		router.PATCH("/:userId", auth.HandleHeaders(ur.config), ur.userController.UpdateUser)
	}
}
