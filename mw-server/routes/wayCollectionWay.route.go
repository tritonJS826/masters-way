package routes

import (
	"mwserver/auth"
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
	router.POST("", auth.AuthMiddleware(), cr.wayCollectionWayController.CreateWayCollectionWay)
	router.DELETE("/:wayId/:wayCollectionId", auth.AuthMiddleware(), cr.wayCollectionWayController.DeleteWayCollectionWayById)
}
