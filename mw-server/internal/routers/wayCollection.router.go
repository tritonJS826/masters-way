package routers

import (
	"mwserver/auth"
	"mwserver/internal/controllers"

	"github.com/gin-gonic/gin"
)

type WayCollectionRouter struct {
	wayCollectionController *controllers.WayCollectionController
}

func NewWayCollectionRouter(wayCollectionController *controllers.WayCollectionController) *WayCollectionRouter {
	return &WayCollectionRouter{wayCollectionController}
}

func (wr *WayCollectionRouter) setWayCollectionRoutes(rg *gin.RouterGroup) {
	router := rg.Group("wayCollections")
	router.POST("", auth.AuthMiddleware(), wr.wayCollectionController.CreateWayCollection)
	router.PATCH("/:wayCollectionId", auth.AuthMiddleware(), wr.wayCollectionController.UpdateWayCollection)
	router.DELETE("/:wayCollectionId", auth.AuthMiddleware(), wr.wayCollectionController.DeleteWayCollectionById)
}
