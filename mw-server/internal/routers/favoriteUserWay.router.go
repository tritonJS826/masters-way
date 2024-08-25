package routers

import (
	"mwserver/auth"
	"mwserver/internal/controllers"

	"github.com/gin-gonic/gin"
)

type FavoriteUserWayRouter struct {
	favoriteUserWayController *controllers.FavoriteUserWayController
}

func NewFavoriteUserWayRouter(favoriteUserWayController *controllers.FavoriteUserWayController) *FavoriteUserWayRouter {
	return &FavoriteUserWayRouter{favoriteUserWayController}
}

func (fuwr *FavoriteUserWayRouter) setFavoriteUserWayRoutes(rg *gin.RouterGroup) {
	router := rg.Group("favoriteUserWays")
	router.POST("", auth.AuthMiddleware(), fuwr.favoriteUserWayController.CreateFavoriteUserWay)
	router.DELETE("/:userUuid/:wayUuid", auth.AuthMiddleware(), fuwr.favoriteUserWayController.DeleteFavoriteUserWayById)
}
