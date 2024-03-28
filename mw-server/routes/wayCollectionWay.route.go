package routes

import (
	"mwserver/controllers"

	"github.com/gin-gonic/gin"
)

type WayCollectionWayRoutes struct {
	wayCollectionWayController controllers.WayCollectionWayController
}

func NewRouteWayCollectionWay(wayCollectionWayController controllers.WayCollectionWayController) WayCollectionWayRoutes {
	return WayCollectionWayRoutes{wayCollectionWayController}
}

func (cr *WayCollectionWayRoutes) WayCollectionWayRoute(rg *gin.RouterGroup) {
	router := rg.Group("wayCollectionWays")
	router.POST("", cr.wayCollectionWayController.CreateWayCollectionWay)
	router.DELETE("/:wayId/:wayCollectionId", cr.wayCollectionWayController.DeleteWayCollectionWayById)
}
