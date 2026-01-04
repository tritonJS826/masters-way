package routers

import (
	"mw-general-bff/internal/auth"
	"mw-general-bff/internal/config"
	"mw-general-bff/internal/controllers"

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
	{
		router.GET("", cr.wayController.GetAllWays)
		router.GET("/user/:userId", cr.wayController.GetUserOwnWays)
		router.POST("", auth.HandleHeaders(cr.config), cr.wayController.CreateWay)
		router.POST("/createFromTraining", auth.HandleHeaders(cr.config), cr.wayController.CreateWayFromTraining)
		router.GET("/:wayId", cr.wayController.GetWayById)
		router.GET("/:wayId/statistics", cr.wayController.GetWayStatisticsById)
		router.PATCH("/:wayId", auth.HandleHeaders(cr.config), cr.wayController.UpdateWay)
		router.DELETE("/:wayId", auth.HandleHeaders(cr.config), cr.wayController.DeleteWayById)
	}
}
