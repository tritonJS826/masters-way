package routes

import (
	"mwserver/controllers"

	"github.com/gin-gonic/gin"
)

type WayRoutes struct {
	wayController controllers.WayController
}

func NewRouteWay(wayController controllers.WayController) WayRoutes {
	return WayRoutes{wayController}
}

func (cr *WayRoutes) WayRoute(rg *gin.RouterGroup) {
	router := rg.Group("ways")
	router.POST("/", cr.wayController.CreateWay)
	router.GET("/", cr.wayController.GetAllWays)
	router.PATCH("/:wayId", cr.wayController.UpdateWay)
	router.GET("/:wayId", cr.wayController.GetWayById)
	router.DELETE("/:wayId", cr.wayController.DeleteWayById)
}
