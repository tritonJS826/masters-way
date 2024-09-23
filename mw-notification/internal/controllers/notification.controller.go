package controllers

import (
	"mwnotification/internal/services"

	"github.com/gin-gonic/gin"
)

type NotificationController struct {
	notificationService *services.NotificationService
}

func NewNotificationController(notificationService *services.NotificationService) *NotificationController {
	return &NotificationController{notificationService}
}

// @Summary Get notification list by user id
// @Description
// @Tags notification
// @ID get-notification-list
// @Accept  json
// @Produce  json
// @Success 204
// @Router /list [get]
func (rc *NotificationController) GetNotificationListByUserId(ctx *gin.Context) {
	// userIDRaw, _ := ctx.Get(auth.ContextKeyUserID)
	// userUUID := uuid.MustParse(userIDRaw.(string))

	// chatPreview, err := rc.notificationService.GetNotificationListByUserId(ctx, userUUID)
	// utils.HandleErrorGin(ctx, err)

	// ctx.JSON(http.StatusOK, chatPreview)
}
