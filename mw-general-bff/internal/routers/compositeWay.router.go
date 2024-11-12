package routers

import (
	"mw-general-bff/internal/auth"
	"mw-general-bff/internal/config"
	"mw-general-bff/internal/controllers"

	"github.com/gin-gonic/gin"
)

type compositeWayRouter struct {
	compositeWayController *controllers.CompositeWayController
	config                 *config.Config
}

func newCompositeWayRouter(compositeWayController *controllers.CompositeWayController, config *config.Config) *compositeWayRouter {
	return &compositeWayRouter{compositeWayController, config}
}

func (cr *compositeWayRouter) setCompositeWayRoutes(rg *gin.RouterGroup) {
	router := rg.Group("compositeWay", auth.HandleHeaders(cr.config))
	{
		router.POST("", cr.compositeWayController.AddWayToCompositeWay)
		router.DELETE("/:parentWayId/:childWayId", cr.compositeWayController.DeleteCompositeWayRelation)
	}
}
