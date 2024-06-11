package routes

import (
	"mwserver/auth"
	"mwserver/controllers"

	"github.com/gin-gonic/gin"
)

type CompositeWayRoutes struct {
	compositeWayController controllers.CompositeWayController
}

func NewRouteCompositeWay(compositeWayController controllers.CompositeWayController) CompositeWayRoutes {
	return CompositeWayRoutes{compositeWayController}
}

func (cr *CompositeWayRoutes) CompositeWayRoute(rg *gin.RouterGroup) {
	router := rg.Group("compositeWay")
	router.POST("", auth.AuthMiddleware(), cr.compositeWayController.AddWayToCompositeWay)
	router.DELETE("/:parentWayId/:childWayId", auth.AuthMiddleware(), cr.compositeWayController.DeleteCompositeWayRelation)
}
