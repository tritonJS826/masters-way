package routers

import (
	"mw-server/internal/config"
	"mw-server/internal/controllers"

	"github.com/gin-gonic/gin"
)

type companionRouter struct {
	controller *controllers.CompanionController
	config     *config.Config
}

func newCompanionRouter(controller *controllers.CompanionController, config *config.Config) *companionRouter {
	return &companionRouter{controller, config}
}

func (r *companionRouter) setCompanionRoutes(group *gin.RouterGroup) {
	companion := group.Group("/companion")
	{
		companion.GET("/:wayId", r.controller.GetCompanionFeedback)
	}
}
