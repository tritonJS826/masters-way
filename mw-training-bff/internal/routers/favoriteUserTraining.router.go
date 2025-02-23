package routers

import (
	"mw-training-bff/internal/auth"
	"mw-training-bff/internal/config"
	"mw-training-bff/internal/controllers"

	"github.com/gin-gonic/gin"
)

type favoriteUserTrainingRouter struct {
	favoriteUserTrainingController *controllers.FavoriteUserTrainingController
	config                         *config.Config
}

func newFavoriteUserTrainingRouter(favoriteUserTrainingController *controllers.FavoriteUserTrainingController, config *config.Config) *favoriteUserTrainingRouter {
	return &favoriteUserTrainingRouter{favoriteUserTrainingController, config}
}

func (mr *favoriteUserTrainingRouter) setFavoriteUserTrainingRoutes(rg *gin.RouterGroup) {
	favoriteUserTrainings := rg.Group("/favoriteUserTrainings", auth.HandleHeaders())
	favoriteUserTrainings.POST(":trainingId", auth.HandleHeaders(), mr.favoriteUserTrainingController.CreateFavoriteUserTraining)
	favoriteUserTrainings.DELETE(":trainingId", auth.HandleHeaders(), mr.favoriteUserTrainingController.DeleteFavoriteUserTraining)
}
