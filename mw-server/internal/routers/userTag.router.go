package routers

import (
	"mwserver/auth"
	"mwserver/internal/controllers"

	"github.com/gin-gonic/gin"
)

type UserTagRouter struct {
	userTagController *controllers.UserTagController
}

func NewUserTagRouter(userTagController *controllers.UserTagController) *UserTagRouter {
	return &UserTagRouter{userTagController}
}

func (ur *UserTagRouter) setUserTagRoutes(rg *gin.RouterGroup) {
	router := rg.Group("userTags")
	router.POST("", auth.AuthMiddleware(), ur.userTagController.AddUserTagByName)
	router.DELETE("/:userTagId/:userId", auth.AuthMiddleware(), ur.userTagController.DeleteUserTagByFromUserByTag)
}
