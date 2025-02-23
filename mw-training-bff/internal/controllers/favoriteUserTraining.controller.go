package controllers

import (
	"mw-training-bff/internal/auth"
	"mw-training-bff/internal/services"
	util "mw-training-bff/internal/utils"
	"net/http"

	"github.com/gin-gonic/gin"
)

type FavoriteUserTrainingController struct {
	generalService              *services.GeneralService
	favoriteUserTrainingService *services.FavoriteUserTrainingService
}

func NewFavoriteUserTrainingController(generalService *services.GeneralService, favoriteUserTrainingService *services.FavoriteUserTrainingService) *FavoriteUserTrainingController {
	return &FavoriteUserTrainingController{generalService, favoriteUserTrainingService}
}

// @Summary Create favorite user training
// @Description
// @Tags favorite-user-training
// @ID create-favorite-user-training
// @Accept json
// @Produce json
// @Param trainingId path string true "training id"
// @Success 200
// @Router /favoriteUserTrainings/{trainingId} [post]
func (ftc *FavoriteUserTrainingController) CreateFavoriteUserTraining(ctx *gin.Context) {
	userUUID := ctx.Value(auth.ContextKeyUserID).(string)
	trainingIdRaw := ctx.Param("trainingId")

	args := &services.CreateFavoriteUserTrainingParams{
		TrainingUuid: trainingIdRaw,
		UserUuid:     userUUID,
	}

	err := ftc.favoriteUserTrainingService.CreateFavoriteUserTraining(ctx, args)
	util.HandleErrorGin(ctx, err)

	ctx.Status(http.StatusOK)
}

// @Summary Delete favorite user training
// @Description
// @Tags favorite-user-training
// @ID delete-favorite-user-training
// @Accept json
// @Produce json
// @Param trainingId path string true "training id"
// @Success 200
// @Router /favoriteUserTrainings/{trainingId} [delete]
func (ftc *FavoriteUserTrainingController) DeleteFavoriteUserTraining(ctx *gin.Context) {
	userUUID := ctx.Value(auth.ContextKeyUserID).(string)
	trainingIdRaw := ctx.Param("trainingId")

	args := &services.DeleteFavoriteUserTrainingParams{
		TrainingUuid: trainingIdRaw,
		UserUuid:     userUUID,
	}

	err := ftc.favoriteUserTrainingService.DeleteFavoriteUserTraining(ctx, args)
	util.HandleErrorGin(ctx, err)

	ctx.Status(http.StatusOK)
}
