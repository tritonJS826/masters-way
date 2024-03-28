package routes

import (
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
	router.POST("", cr.wayTagController.AddWayTagToWay)
	router.DELETE("/:wayTagId/:wayId", cr.wayTagController.DeleteWayTagFromWayByTagId)
}
