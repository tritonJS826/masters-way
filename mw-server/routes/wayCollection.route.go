package routes

import (
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
	router.POST("", cr.wayCollectionController.CreateWayCollection)
	router.PATCH("/:wayCollectionId", cr.wayCollectionController.UpdateWayCollection)
	router.DELETE("/:wayCollectionId", cr.wayCollectionController.DeleteWayCollectionById)
}
