package routers

import (
	"mwserver/auth"
	"mwserver/internal/controllers"

	"github.com/gin-gonic/gin"
)

type WayRouter struct {
	wayController *controllers.WayController
}

func NewWayRouter(wayController *controllers.WayController) *WayRouter {
	return &WayRouter{wayController}
}

func (cr *WayRouter) setWayRoutes(rg *gin.RouterGroup) {
	router := rg.Group("ways")
	router.GET("", cr.wayController.GetAllWays)
	router.GET("/:wayId", cr.wayController.GetWayById)
	router.GET("/:wayId/statistics", cr.wayController.GetWayStatisticsById)
	router.POST("", auth.AuthMiddleware(), cr.wayController.CreateWay)
	router.PATCH("/:wayId", auth.AuthMiddleware(), cr.wayController.UpdateWay)
	router.DELETE("/:wayId", auth.AuthMiddleware(), cr.wayController.DeleteWayById)
}
