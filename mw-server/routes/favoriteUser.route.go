package routes

import (
	"mwserver/auth"
	"mwserver/controllers"

	"github.com/gin-gonic/gin"
)

type FavoriteUserRoutes struct {
	favoriteUserController controllers.FavoriteUserController
}

func NewRouteFavoriteUser(favoriteUserController controllers.FavoriteUserController) FavoriteUserRoutes {
	return FavoriteUserRoutes{favoriteUserController}
}

func (cr *FavoriteUserRoutes) FavoriteUserRoute(rg *gin.RouterGroup) {
	router := rg.Group("favoriteUsers")
	router.POST("", auth.AuthMiddleware(), cr.favoriteUserController.CreateFavoriteUser)
	router.DELETE("/:donorUserUuid/:acceptorUserUuid", auth.AuthMiddleware(), cr.favoriteUserController.DeleteFavoriteUserById)
}
