package controllers

import (
	"mw-server/internal/auth"
	"net/http"

	"mw-server/internal/schemas"
	"mw-server/internal/services"
	"mw-server/pkg/util"

	"github.com/gin-gonic/gin"
)

type NotificationSettingController struct {
	notificationSettingService *services.NotificationSettingService
}

func NewNotificationSettingController(notificationSettingService *services.NotificationSettingService) *NotificationSettingController {
	return &NotificationSettingController{notificationSettingService: notificationSettingService}
}

func (ec *NotificationSettingController) CreateNotificationSettings(ctx *gin.Context) {
	userUUIDRaw, _ := ctx.Get(auth.ContextKeyUserID)
	userUUID := userUUIDRaw.(string)

	err := ec.notificationSettingService.CreateNotificationSettings(ctx, userUUID)
	if err != nil {
		util.HandleErrorGin(ctx, err)
		return
	}

	ctx.Status(http.StatusNoContent)
}

func (ec *NotificationSettingController) UpdateNotificationSetting(ctx *gin.Context) {
	notificationSettingUUID := ctx.Param("notificationSettingId")

	var req schemas.UpdateNotificationSettingRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		util.HandleErrorGin(ctx, err)
		return
	}

	notificationSetting, err := ec.notificationSettingService.UpdateNotificationSetting(ctx, notificationSettingUUID, req.IsEnabled)
	if err != nil {
		util.HandleErrorGin(ctx, err)
		return
	}

	ctx.JSON(http.StatusOK, schemas.NotificationSettingResponse{
		UUID:      notificationSetting.UUID,
		UserUUID:  notificationSetting.UserUUID,
		Nature:    notificationSetting.Nature,
		Channel:   notificationSetting.Channel,
		IsEnabled: notificationSetting.IsEnabled,
	})
}

func (ec *NotificationSettingController) GetNotificationSettingList(ctx *gin.Context) {
	userUUIDRaw, _ := ctx.Get(auth.ContextKeyUserID)
	userUUID := userUUIDRaw.(string)

	getNotificationSettingListRaw, err := ec.notificationSettingService.GetNotificationSettingList(ctx, userUUID)
	if err != nil {
		util.HandleErrorGin(ctx, err)
		return
	}

	ctx.JSON(http.StatusOK, getNotificationSettingListRaw)
}