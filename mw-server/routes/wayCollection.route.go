package routes

import (
	"mwserver/auth"
	"mwserver/controllers"

	"github.com/gin-gonic/gin"
)

type WayCollectionRoutes struct {
	wayCollectionController controllers.WayCollectionController
}

func NewRouteWayCollection(wayCollectionController controllers.WayCollectionController) WayCollectionRoutes {
	return WayCollectionRoutes{wayCollectionController}
}

func (cr *WayCollectionRoutes) WayCollectionRoute(rg *gin.RouterGroup) {
	router := rg.Group("wayCollections")
	router.POST("", auth.AuthMiddleware(), cr.wayCollectionController.CreateWayCollection)
	router.PATCH("/:wayCollectionId", auth.AuthMiddleware(), cr.wayCollectionController.UpdateWayCollection)
	router.DELETE("/:wayCollectionId", auth.AuthMiddleware(), cr.wayCollectionController.DeleteWayCollectionById)
}
