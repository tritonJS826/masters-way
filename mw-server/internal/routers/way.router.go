package routers

import (
	"mw-server/internal/auth"
	"mw-server/internal/config"
	"mw-server/internal/controllers"

	"github.com/gin-gonic/gin"
)

type wayRouter struct {
	wayController *controllers.WayController
	config        *config.Config
}

func newWayRouter(wayController *controllers.WayController, config *config.Config) *wayRouter {
	return &wayRouter{wayController, config}
}

func (cr *wayRouter) setWayRoutes(rg *gin.RouterGroup) {
	router := rg.Group("ways")
	router.GET("", cr.wayController.GetAllWays)
	router.GET("/user/:userId", cr.wayController.GetUserOwnWays)
	router.GET("/:wayId", cr.wayController.GetWayById)
	router.GET("/:wayId/notification", cr.wayController.GetWayPlainForNotificationById)
	router.GET("/:wayId/statistics", cr.wayController.GetWayStatisticsById)
	router.POST("", auth.AuthMiddleware(cr.config), cr.wayController.CreateWay)
	router.PATCH("/:wayId", auth.AuthMiddleware(cr.config), cr.wayController.UpdateWay)
	router.DELETE("/:wayId", auth.AuthMiddleware(cr.config), cr.wayController.DeleteWayById)
}
