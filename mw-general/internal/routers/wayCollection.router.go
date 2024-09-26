package routers

import (
	"mwgeneral/internal/auth"
	"mwgeneral/internal/config"
	"mwgeneral/internal/controllers"

	"github.com/gin-gonic/gin"
)

type wayCollectionRouter struct {
	wayCollectionController *controllers.WayCollectionController
	config                  *config.Config
}

func newWayCollectionRouter(wayCollectionController *controllers.WayCollectionController, config *config.Config) *wayCollectionRouter {
	return &wayCollectionRouter{wayCollectionController, config}
}

func (wr *wayCollectionRouter) setWayCollectionRoutes(rg *gin.RouterGroup) {
	router := rg.Group("wayCollections")
	router.POST("", auth.AuthMiddleware(wr.config), wr.wayCollectionController.CreateWayCollection)
	router.PATCH("/:wayCollectionId", auth.AuthMiddleware(wr.config), wr.wayCollectionController.UpdateWayCollection)
	router.DELETE("/:wayCollectionId", auth.AuthMiddleware(wr.config), wr.wayCollectionController.DeleteWayCollectionById)
}
