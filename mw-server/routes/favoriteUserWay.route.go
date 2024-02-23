package routes

import (
	"mwserver/controllers"

	"github.com/gin-gonic/gin"
)

type FavoriteUserWayRoutes struct {
	favoriteUserWayController controllers.FavoriteUserWayController
}

func NewRouteFavoriteUserWay(favoriteUserWayController controllers.FavoriteUserWayController) FavoriteUserWayRoutes {
	return FavoriteUserWayRoutes{favoriteUserWayController}
}

func (cr *FavoriteUserWayRoutes) FavoriteUserWayRoute(rg *gin.RouterGroup) {
	router := rg.Group("favoriteUserWays")
	router.POST("/", cr.favoriteUserWayController.CreateFavoriteUserWay)
	router.DELETE("/:userUuid/:wayUuid", cr.favoriteUserWayController.DeleteFavoriteUserWayById)
}
