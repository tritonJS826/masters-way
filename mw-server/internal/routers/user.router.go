package routers

import (
	"mwserver/auth"
	"mwserver/internal/controllers"

	"github.com/gin-gonic/gin"
)

type UserRouter struct {
	userController *controllers.UserController
}

func NewUserRouter(userController *controllers.UserController) *UserRouter {
	return &UserRouter{userController}
}

func (ur *UserRouter) setUserRoutes(rg *gin.RouterGroup) {
	router := rg.Group("users")
	router.GET("", ur.userController.GetAllUsers)
	router.GET("/:userId", ur.userController.GetUserById)
	router.PATCH("/:userId", auth.AuthMiddleware(), ur.userController.UpdateUser)

	router.GET("/list-by-ids", auth.AuthMiddleware(), ur.userController.GetUsersByIDs)
}
