package routers

import (
	"mwserver/auth"
	"mwserver/internal/controllers"

	"github.com/gin-gonic/gin"
)

type WayCollectionWayRouter struct {
	wayCollectionWayController *controllers.WayCollectionWayController
}

func NewWayCollectionWayRouter(wayCollectionWayController *controllers.WayCollectionWayController) *WayCollectionWayRouter {
	return &WayCollectionWayRouter{wayCollectionWayController}
}

func (wr *WayCollectionWayRouter) setWayCollectionWayRoutes(rg *gin.RouterGroup) {
	router := rg.Group("wayCollectionWays")
	router.POST("", auth.AuthMiddleware(), wr.wayCollectionWayController.CreateWayCollectionWay)
	router.DELETE("/:wayId/:wayCollectionId", auth.AuthMiddleware(), wr.wayCollectionWayController.DeleteWayCollectionWayById)
}
