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
	router.POST("/", cr.wayTagController.CreateWayTag)
	router.PATCH("/:wayTagId", cr.wayTagController.UpdateWayTag)
	router.GET("/:wayId", cr.wayTagController.GetWayTagByWayId)
	router.DELETE("/:wayTagId", cr.wayTagController.DeleteWayTagById)
}
