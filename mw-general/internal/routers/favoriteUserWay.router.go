package routers

import (
	"mw-general/internal/auth"
	"mw-general/internal/config"
	"mw-general/internal/controllers"

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
	router.POST("", auth.AuthMiddleware(fr.config), fr.favoriteUserWayController.CreateFavoriteUserWay)
	router.DELETE("/:userUuid/:wayUuid", auth.AuthMiddleware(fr.config), fr.favoriteUserWayController.DeleteFavoriteUserWayById)
}
