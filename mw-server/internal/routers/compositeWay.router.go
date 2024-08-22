package routers

import (
	"mwserver/auth"
	"mwserver/internal/controllers"

	"github.com/gin-gonic/gin"
)

type CompositeWayRouter struct {
	compositeWayController *controllers.CompositeWayController
}

func NewCompositeWayRouter(compositeWayController *controllers.CompositeWayController) *CompositeWayRouter {
	return &CompositeWayRouter{compositeWayController}
}

func (cr *CompositeWayRouter) SetCompositeWayRoutes(rg *gin.RouterGroup) {
	router := rg.Group("compositeWay")
	router.POST("", auth.AuthMiddleware(), cr.compositeWayController.AddWayToCompositeWay)
	router.DELETE("/:parentWayId/:childWayId", auth.AuthMiddleware(), cr.compositeWayController.DeleteCompositeWayRelation)
}
