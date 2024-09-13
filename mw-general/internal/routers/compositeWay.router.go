package routers

import (
	"mw-general/internal/auth"
	"mw-general/internal/config"
	"mw-general/internal/controllers"

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
	router := rg.Group("compositeWay")
	router.POST("", auth.AuthMiddleware(cr.config), cr.compositeWayController.AddWayToCompositeWay)
	router.DELETE("/:parentWayId/:childWayId", auth.AuthMiddleware(cr.config), cr.compositeWayController.DeleteCompositeWayRelation)
}
