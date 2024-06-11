package routes

import (
	"mwserver/auth"
	"mwserver/controllers"

	"github.com/gin-gonic/gin"
)

type WayTagRoutes struct {
	wayTagController controllers.WayTagController
}

func NewRouteWayTag(wayTagController controllers.WayTagController) WayTagRoutes {
	return WayTagRoutes{wayTagController}
}

func (cr *WayTagRoutes) WayTagRoute(rg *gin.RouterGroup) {
	router := rg.Group("wayTags")
	router.POST("", auth.AuthMiddleware(), cr.wayTagController.AddWayTagToWay)
	router.DELETE("/:wayTagId/:wayId", auth.AuthMiddleware(), cr.wayTagController.DeleteWayTagFromWayByTagId)
}
