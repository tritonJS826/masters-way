package controllers

import (
	"mwnotification/internal/auth"
	"mwnotification/internal/schemas"
	"mwnotification/internal/services"
	"mwnotification/pkg/utils"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

type NotificationController struct {
	notificationService *services.NotificationService
}

func NewNotificationController(notificationService *services.NotificationService) *NotificationController {
	return &NotificationController{notificationService}
}

// Create notification handler
// @Summary Create a new notification
// @Description
// @Tags notification
// @ID create-notification
// @Accept json
// @Produce json
// @Param request body schemas.CreateNotificationPayload true "query params"
// @Success 200 {object} schemas.NotificationResponse
// @Router /notifications [post]
func (nc *NotificationController) CreateNotification(ctx *gin.Context) {
	var payload *schemas.CreateNotificationPayload

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "Failed payload", "error": err.Error()})
		return
	}

	userIDRaw, _ := ctx.Get(auth.ContextKeyUserID)
	userUUID := uuid.MustParse(userIDRaw.(string))

	params := &services.CreateNotificationParams{
		UserID:      userUUID,
		Description: payload.Description,
		Url:         payload.Url,
		Nature:      payload.Nature,
	}
	notification, err := nc.notificationService.CreateNotification(ctx, params)
	utils.HandleErrorGin(ctx, err)

	ctx.JSON(http.StatusOK, notification)
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
	notificationID := ctx.Param("notificationId")

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "Failed payload", "error": err.Error()})
		return
	}

	params := &services.UpdateNotificationParams{
		NotificationID: uuid.MustParse(notificationID),
		IsRead:         payload.IsRead,
	}
	notification, err := nc.notificationService.UpdateNotification(ctx, params)
	utils.HandleErrorGin(ctx, err)

	ctx.JSON(http.StatusOK, notification)
}

// @Summary Get notification list by user id
// @Description
// @Tags notification
// @ID get-notification-list
// @Accept json
// @Produce json
// @Success 200 {object} schemas.GetNotificationListResponse
// @Router /notifications [get]
func (nc *NotificationController) GetNotificationListByUserID(ctx *gin.Context) {
	userIDRaw, _ := ctx.Get(auth.ContextKeyUserID)
	userUUID := uuid.MustParse(userIDRaw.(string))

	response, err := nc.notificationService.GetNotificationListByUserID(ctx, userUUID)
	utils.HandleErrorGin(ctx, err)

	ctx.JSON(http.StatusOK, response)
}
