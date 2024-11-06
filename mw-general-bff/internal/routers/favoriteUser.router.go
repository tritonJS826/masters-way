package routers

import (
	"mw-general-bff/internal/auth"
	"mw-general-bff/internal/config"
	"mw-general-bff/internal/controllers"

	"github.com/gin-gonic/gin"
)

type favoriteUserRouter struct {
	favoriteUserController *controllers.FavoriteUserController
	config                 *config.Config
}

func newFavoriteUserRouter(favoriteUserController *controllers.FavoriteUserController, config *config.Config) *favoriteUserRouter {
	return &favoriteUserRouter{favoriteUserController, config}
}

func (fr *favoriteUserRouter) setFavoriteUserRoutes(rg *gin.RouterGroup) {
	router := rg.Group("favoriteUsers")
	router.POST("", auth.AuthMiddleware(fr.config), fr.favoriteUserController.CreateFavoriteUser)
	router.DELETE("/:donorUserUuid/:acceptorUserUuid", auth.AuthMiddleware(fr.config), fr.favoriteUserController.DeleteFavoriteUserById)
}
