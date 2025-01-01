package controllers

import (
	"mw-training-bff/internal/schemas"
	"mw-training-bff/internal/services"
	"net/http"

	"github.com/gin-gonic/gin"
)

// This line required to import schemas for swagger
var stubModel schemas.CreateTrainingTrainingTagPayload

type TrainingTrainingTagController struct {
	generalService             *services.GeneralService
	trainingTrainingTagService *services.TrainingTrainingTagService
}

func NewTrainingTrainingTagController(generalService *services.GeneralService, trainingTrainingTagService *services.TrainingTrainingTagService) *TrainingTrainingTagController {
	return &TrainingTrainingTagController{generalService, trainingTrainingTagService}
}

// @Summary Create training training tag
// @Description
// @Tags training-training-tag
// @ID create-training-training-tag
// @Accept json
// @Produce json
// @Param request body schemas.CreateTrainingTrainingTagPayload true "query params"
// @Param trainingId path string true "training id"
// @Success 200
// @Router /trainingTrainingTags/{trainingId} [post]
func (nc *TrainingTrainingTagController) CreateTrainingTag(ctx *gin.Context) {
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

	// response, err := nc.trainingTrainingTagService.GetNotificationList(ctx, getNotificationListParams)
	// utils.HandleErrorGin(ctx, err)

	ctx.Status(http.StatusOK)
}

// @Summary Delete training training tag
// @Description
// @Tags training-training-tag
// @ID delete-training-training-tag
// @Accept json
// @Produce json
// @Param trainingId path string true "training id"
// @Param trainingTagId path string true "training tag id"
// @Success 200
// @Router /trainingTrainingTags/{trainingId}/trainingTag/{trainingTagId} [delete]
func (nc *TrainingTrainingTagController) DeleteTrainingTag(ctx *gin.Context) {
	// var payload *schemas.UpdateNotificationPayload
	// notificationUUID := ctx.Param("notificationId")

	// if err := ctx.ShouldBindJSON(&payload); err != nil {
	// 	ctx.JSON(http.StatusBadRequest, gin.H{"status": "Failed payload", "error": err.Error()})
	// 	return
	// }

	// response, err := nc.trainingTrainingTagService.UpdateNotification(ctx, notificationUUID, payload.IsRead)
	// utils.HandleErrorGin(ctx, err)

	ctx.Status(http.StatusOK)
}
