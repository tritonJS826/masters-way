package routes

import (
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
	// router.POST("", cr.userController.CreateUser)
	router.POST("/getOrCreateByFirebaseId", cr.userController.GetOrCreateUserByFirebaseId)
	router.GET("", cr.userController.GetAllUsers)
	router.PATCH("/:userId", cr.userController.UpdateUser)
	router.GET("/:userId", cr.userController.GetUserById)
}
