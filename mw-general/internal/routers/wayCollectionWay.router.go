package routers

import (
	"mwserver/internal/auth"
	"mwserver/internal/config"
	"mwserver/internal/controllers"

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
	router := rg.Group("wayCollectionWays")
	router.POST("", auth.AuthMiddleware(wr.config), wr.wayCollectionWayController.CreateWayCollectionWay)
	router.DELETE("/:wayId/:wayCollectionId", auth.AuthMiddleware(wr.config), wr.wayCollectionWayController.DeleteWayCollectionWayById)
}
