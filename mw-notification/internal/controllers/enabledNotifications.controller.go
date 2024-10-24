package controllers

import (
	"mwnotification/internal/auth"
	"mwnotification/internal/services"
	"mwnotification/pkg/utils"
	"net/http"

	"github.com/gin-gonic/gin"
)

type EnabledNotificationController struct {
	enabledNotificationService *services.EnabledNotificationService
}

func NewEnabledNotificationController(notificationService *services.EnabledNotificationService) *EnabledNotificationController {
	return &EnabledNotificationController{notificationService}
}

// Create enabledNotification handler
// @Summary Create a new enabledNotifications
// @Description
// @Tags enabledNotification
// @ID create-enabledNotification
// @Accept json
// @Produce json
// @Success 204
// @Router /enabled-notifications [post]
func (ec *EnabledNotificationController) CreateEnabledNotification(ctx *gin.Context) {
	userIDRaw, _ := ctx.Get(auth.ContextKeyUserID)
	userID := userIDRaw.(string)

	err := ec.enabledNotificationService.CreateEnabledNotification(ctx, userID)
	utils.HandleErrorGin(ctx, err)

	ctx.Status(http.StatusNoContent)
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
// func (nc *NotificationController) UpdateNotification(ctx *gin.Context) {
// 	var payload *schemas.UpdateNotificationPayload
// 	notificationID := ctx.Param("notificationId")

// 	if err := ctx.ShouldBindJSON(&payload); err != nil {
// 		ctx.JSON(http.StatusBadRequest, gin.H{"status": "Failed payload", "error": err.Error()})
// 		return
// 	}

// 	params := services.UpdateNotificationParams{
// 		NotificationID: notificationID,
// 		IsRead:         payload.IsRead,
// 	}

// 	notification, err := nc.notificationService.UpdateNotification(ctx, &params)
// 	utils.HandleErrorGin(ctx, err)

// 	ctx.JSON(http.StatusOK, notification)
// }

// @Summary Get notification list by user id
// @Description
// @Tags notification
// @ID get-notification-list
// @Accept json
// @Produce json
// @Success 200 {object} schemas.GetNotificationListResponse
// @Router /notifications [get]
// func (rc *NotificationController) GetNotificationListByUserID(ctx *gin.Context) {
// 	userIDRaw, _ := ctx.Get(auth.ContextKeyUserID)
// 	userID := userIDRaw.(string)

// 	response, err := rc.notificationService.GetNotificationListByUserID(ctx, userID)
// 	utils.HandleErrorGin(ctx, err)

// 	ctx.JSON(http.StatusOK, response)
// }
