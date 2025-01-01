package controllers

import (
	"mw-training-bff/internal/services"
	"net/http"

	"github.com/gin-gonic/gin"
)

type TrainingMentorController struct {
	generalService        *services.GeneralService
	trainingMentorService *services.TrainingMentorService
}

func NewTrainingMentorController(generalService *services.GeneralService, trainingMentorService *services.TrainingMentorService) *TrainingMentorController {
	return &TrainingMentorController{generalService, trainingMentorService}
}

// @Summary Create mentor
// @Description
// @Tags training-mentor
// @ID create-training-mentor
// @Accept json
// @Produce json
// @Param trainingId path string true "training id"
// @Param userId path string true "user id"
// @Success 200
// @Router /trainingMentors/{trainingId}/user/{userId} [post]
func (nc *TrainingMentorController) CreateMentor(ctx *gin.Context) {
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

	ctx.Status(http.StatusOK)
}

// @Summary Delete mentor by id
// @Description
// @Tags training-mentor
// @ID delete-training-mentor
// @Accept json
// @Produce json
// @Param trainingId path string true "training id"
// @Param userId path string true "user id"
// @Success 200
// @Router /trainingMentors/{trainingId}/user/{userId} [delete]
func (nc *TrainingMentorController) DeleteMentor(ctx *gin.Context) {
	// var payload *schemas.UpdateNotificationPayload
	// notificationUUID := ctx.Param("notificationId")

	// if err := ctx.ShouldBindJSON(&payload); err != nil {
	// 	ctx.JSON(http.StatusBadRequest, gin.H{"status": "Failed payload", "error": err.Error()})
	// 	return
	// }

	// response, err := nc.notificationService.UpdateNotification(ctx, notificationUUID, payload.IsRead)
	// utils.HandleErrorGin(ctx, err)

	ctx.Status(http.StatusOK)
}
