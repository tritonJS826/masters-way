package routes

import (
	"mwserver/controllers"

	"github.com/gin-gonic/gin"
)

type UserTagRoutes struct {
	userTagController controllers.UserTagController
}

func NewRouteUserTag(userTagController controllers.UserTagController) UserTagRoutes {
	return UserTagRoutes{userTagController}
}

func (cr *UserTagRoutes) UserTagRoute(rg *gin.RouterGroup) {
	router := rg.Group("userTags")
	router.POST("", cr.userTagController.AddUserTagByName)
	router.DELETE("/:userTagId/:userId", cr.userTagController.DeleteUserTagByFromUserByTag)
}
