package routes

import (
	"mwserver/auth"
	"mwserver/controllers"

	"github.com/gin-gonic/gin"
)

type UserRoutes struct {
	userController controllers.UserController
}

func NewRouteUser(userController controllers.UserController) UserRoutes {
	return UserRoutes{userController}
}

func (cr *UserRoutes) UserRoute(rg *gin.RouterGroup) {
	router := rg.Group("users")
	router.GET("", cr.userController.GetAllUsers)
	router.GET("/:userId", cr.userController.GetUserById)
	router.PATCH("/:userId", auth.AuthMiddleware(), cr.userController.UpdateUser)

	router.GET("/chat", auth.AuthMiddleware(), cr.userController.GetChatUsers)
}
