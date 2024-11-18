package routers

import (
	"mw-general-bff/internal/auth"
	"mw-general-bff/internal/config"
	"mw-general-bff/internal/controllers"

	"github.com/gin-gonic/gin"
)

type wayCollectionWayRouter struct {
	wayCollectionWayController *controllers.WayCollectionWayController
	config                     *config.Config
}

func newWayCollectionWayRouter(wayCollectionWayController *controllers.WayCollectionWayController, config *config.Config) *wayCollectionWayRouter {
	return &wayCollectionWayRouter{wayCollectionWayController, config}
}

func (wr *wayCollectionWayRouter) setWayCollectionWayRoutes(rg *gin.RouterGroup) {
	router := rg.Group("wayCollectionWays", auth.HandleHeaders(wr.config))
	{
		router.POST("", wr.wayCollectionWayController.CreateWayCollectionWay)
		router.DELETE("/:wayId/:wayCollectionId", wr.wayCollectionWayController.DeleteWayCollectionWayById)
	}
}
