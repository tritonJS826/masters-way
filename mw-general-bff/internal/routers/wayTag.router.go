package routers

import (
	"mw-general-bff/internal/auth"
	"mw-general-bff/internal/config"
	"mw-general-bff/internal/controllers"

	"github.com/gin-gonic/gin"
)

type wayTagRouter struct {
	wayTagController *controllers.WayTagController
	config           *config.Config
}

func newWayTagRouter(wayTagController *controllers.WayTagController, config *config.Config) *wayTagRouter {
	return &wayTagRouter{wayTagController, config}
}

func (wr *wayTagRouter) setWayTagRoutes(rg *gin.RouterGroup) {
	router := rg.Group("wayTags", auth.HandleHeaders(wr.config))
	{
		router.POST("", wr.wayTagController.AddWayTagToWay)
		router.DELETE("/:wayTagId/:wayId", wr.wayTagController.DeleteWayTagFromWayByTagId)
	}
}
