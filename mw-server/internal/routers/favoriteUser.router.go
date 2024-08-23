package routers

import (
	"mwserver/auth"
	"mwserver/internal/controllers"

	"github.com/gin-gonic/gin"
)

type FavoriteUserRouter struct {
	favoriteUserController *controllers.FavoriteUserController
}

func NewFavoriteUserRouter(favoriteUserController *controllers.FavoriteUserController) *FavoriteUserRouter {
	return &FavoriteUserRouter{favoriteUserController}
}

func (fur *FavoriteUserRouter) setFavoriteUserRoutes(rg *gin.RouterGroup) {
	router := rg.Group("favoriteUsers")
	router.POST("", auth.AuthMiddleware(), fur.favoriteUserController.CreateFavoriteUser)
	router.DELETE("/:donorUserUuid/:acceptorUserUuid", auth.AuthMiddleware(), fur.favoriteUserController.DeleteFavoriteUserById)
}
