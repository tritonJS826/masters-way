package controllers

import (
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
	var req schemas.CreateNotificationSettingsRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		util.HandleErrorGin(ctx, err)
		return
	}

	err := ec.notificationSettingService.CreateNotificationSettings(ctx, req.UserUUID)
	if err != nil {
		util.HandleErrorGin(ctx, err)
		return
	}

	ctx.Status(http.StatusNoContent)
}

func (ec *NotificationSettingController) UpdateNotificationSetting(ctx *gin.Context) {
	var req schemas.UpdateNotificationSettingRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		util.HandleErrorGin(ctx, err)
		return
	}

	notificationSetting, err := ec.notificationSettingService.UpdateNotificationSetting(ctx, req.NotificationSettingUUID, req.IsEnabled)
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
	var req schemas.GetNotificationSettingListRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		util.HandleErrorGin(ctx, err)
		return
	}

	getNotificationSettingListRaw, err := ec.notificationSettingService.GetNotificationSettingList(ctx, req.UserUUID)
	if err != nil {
		util.HandleErrorGin(ctx, err)
		return
	}

	ctx.JSON(http.StatusOK, getNotificationSettingListRaw)
}