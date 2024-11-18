package controllers

import (
	"mw-notification-bff/internal/auth"
	"mw-notification-bff/internal/schemas"
	"mw-notification-bff/internal/services"
	utils "mw-notification-bff/internal/utils"
	"net/http"

	"github.com/gin-gonic/gin"
)

type NotificationController struct {
	generalService      *services.GeneralService
	notificationService *services.NotificationService
}

func NewNotificationController(generalService *services.GeneralService, notificationService *services.NotificationService) *NotificationController {
	return &NotificationController{generalService, notificationService}
}

// @Summary Get notification list by user id
// @Description
// @Tags notification
// @ID get-notification-list
// @Accept json
// @Produce json
// @Success 200 {object} schemas.GetNotificationListResponse
// @Router /notifications [get]
func (nc *NotificationController) GetNotificationList(ctx *gin.Context) {
	// TODO: token
	userUUID := ctx.Value(auth.ContextKeyUserID).(string)
	response, err := nc.notificationService.GetNotificationList(ctx, userUUID)
	utils.HandleErrorGin(ctx, err)

	ctx.JSON(http.StatusOK, response)
}

// Update notification handler
// @Summary Update notification by id
// @Description
// @Tags notification
// @ID update-notification
// @Accept json
// @Produce json
// @Param request body schemas.UpdateNotificationPayload true "query params"
// @Param notificationId path string true "notification id"
// @Success 200 {object} schemas.NotificationResponse
// @Router /notifications/{notificationId} [patch]
func (nc *NotificationController) UpdateNotification(ctx *gin.Context) {
	var payload *schemas.UpdateNotificationPayload
	notificationUUID := ctx.Param("notificationId")

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "Failed payload", "error": err.Error()})
		return
	}

	// TODO: token
	response, err := nc.notificationService.UpdateNotification(ctx, notificationUUID, payload.IsRead)
	utils.HandleErrorGin(ctx, err)

	ctx.JSON(http.StatusOK, response)
}

// Get enabledNotification list handler
// @Summary Get enabledNotification list by user id
// @Description
// @Tags enabledNotification
// @ID get-enabledNotification-list
// @Accept json
// @Produce json
// @Success 200 {object} schemas.GetEnabledNotificationListResponse
// @Router /enabledNotifications [get]
func (nc *NotificationController) GetEnabledNotificationList(ctx *gin.Context) {
	userUUID := ctx.Value(auth.ContextKeyUserID).(string)
	response, err := nc.notificationService.GetEnabledNotificationList(ctx, userUUID)
	utils.HandleErrorGin(ctx, err)

	ctx.JSON(http.StatusOK, response)
}

// Update enabledNotification handler
// @Summary Update enabledNotification by id
// @Description
// @Tags enabledNotification
// @ID update-enabledNotification
// @Accept json
// @Produce json
// @Param request body schemas.UpdateEnabledNotificationPayload true "query params"
// @Param enabledNotificationId path string true "notification id"
// @Success 200 {object} schemas.EnabledNotificationResponse
// @Router /enabledNotifications/{enabledNotificationId} [patch]
func (nc *NotificationController) UpdateEnabledNotification(ctx *gin.Context) {
	var payload *schemas.UpdateEnabledNotificationPayload

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "Failed payload", "error": err.Error()})
		return
	}

	notificationID := ctx.Param("enabledNotificationId")

	response, err := nc.notificationService.UpdateEnabledNotification(ctx, notificationID, payload.IsEnabled)
	utils.HandleErrorGin(ctx, err)

	ctx.JSON(http.StatusOK, response)
}
