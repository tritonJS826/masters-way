package routers

import (
	"mw-general-bff/internal/auth"
	"mw-general-bff/internal/config"
	"mw-general-bff/internal/controllers"

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
	router := rg.Group("wayCollections", auth.HandleHeaders(wr.config))
	{
		router.POST("", wr.wayCollectionController.CreateWayCollection)
		router.PATCH("/:wayCollectionId", wr.wayCollectionController.UpdateWayCollection)
		router.DELETE("/:wayCollectionId", wr.wayCollectionController.DeleteWayCollectionById)
	}
}
