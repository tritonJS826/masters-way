package routes

import (
	"mwserver/auth"
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
	router.GET("", cr.wayController.GetAllWays)
	router.GET("/:wayId", cr.wayController.GetWayById)
	router.POST("", auth.AuthMiddleware(), cr.wayController.CreateWay)
	router.PATCH("/:wayId", auth.AuthMiddleware(), cr.wayController.UpdateWay)
	router.DELETE("/:wayId", auth.AuthMiddleware(), cr.wayController.DeleteWayById)
}
