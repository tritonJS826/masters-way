package routers

import (
	"mw-general-bff/internal/auth"
	"mw-general-bff/internal/config"
	"mw-general-bff/internal/controllers"

	"github.com/gin-gonic/gin"
)

type favoriteUserWayRouter struct {
	favoriteUserWayController *controllers.FavoriteUserWayController
	config                    *config.Config
}

func newFavoriteUserWayRouter(favoriteUserWayController *controllers.FavoriteUserWayController, config *config.Config) *favoriteUserWayRouter {
	return &favoriteUserWayRouter{favoriteUserWayController, config}
}

func (fr *favoriteUserWayRouter) setFavoriteUserWayRoutes(rg *gin.RouterGroup) {
	router := rg.Group("favoriteUserWays")
	{
		router.POST("", auth.HandleHeaders(fr.config), fr.favoriteUserWayController.CreateFavoriteUserWay)
		router.DELETE("/:userUuid/:wayUuid", auth.HandleHeaders(fr.config), fr.favoriteUserWayController.DeleteFavoriteUserWayById)
	}
}
