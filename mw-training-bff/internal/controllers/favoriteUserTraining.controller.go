package controllers

import (
	"mw-training-bff/internal/services"

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
func (nc *FavoriteUserTrainingController) CreateFavoriteUserTraining(ctx *gin.Context) {
	// userUUID := ctx.Value(auth.ContextKeyUserID).(string)
	// page := ctx.DefaultQuery("page", "1")
	// limit := ctx.DefaultQuery("limit", "50")
	// isOnlyNew := ctx.DefaultQuery("isOnlyNew", "false")

	// reqPage, _ := strconv.Atoi(page)
	// reqLimit, _ := strconv.Atoi(limit)
	// reqIsOnlyNew, err := strconv.ParseBool(isOnlyNew)

	// getNotificationListParams := &services.GetNotificationListParams{
	// 	UserUUID:  userUUID,
	// 	Page:      int32(reqPage),
	// 	Limit:     int32(reqLimit),
	// 	IsOnlyNew: reqIsOnlyNew,
	// }

	// response, err := nc.notificationService.GetNotificationList(ctx, getNotificationListParams)
	// utils.HandleErrorGin(ctx, err)

	// ctx.JSON(http.StatusOK, response)
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
func (nc *FavoriteUserTrainingController) DeleteFavoriteUserTraining(ctx *gin.Context) {
	// var payload *schemas.UpdateNotificationPayload
	// notificationUUID := ctx.Param("notificationId")

	// if err := ctx.ShouldBindJSON(&payload); err != nil {
	// 	ctx.JSON(http.StatusBadRequest, gin.H{"status": "Failed payload", "error": err.Error()})
	// 	return
	// }

	// response, err := nc.notificationService.UpdateNotification(ctx, notificationUUID, payload.IsRead)
	// utils.HandleErrorGin(ctx, err)

	// ctx.JSON(http.StatusOK, response)
}
