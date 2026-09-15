package controllers

import (
	"fmt"
	"mw-server/internal/auth"
	"net/http"
	"strconv"

	"mw-server/internal/schemas"
	"mw-server/internal/services"
	"mw-server/pkg/util"

	"github.com/gin-gonic/gin"
	"github.com/samber/lo"
)

type NotificationController struct {
	notificationService        *services.NotificationService
	notificationSettingService *services.NotificationSettingService
}

func NewNotificationController(
	notificationService *services.NotificationService,
	notificationSettingService *services.NotificationSettingService,
) *NotificationController {
	return &NotificationController{
		notificationService:        notificationService,
		notificationSettingService: notificationSettingService,
	}
}

func (nc *NotificationController) CreateNotifications(ctx *gin.Context) {
	var req schemas.CreateNotificationRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		util.HandleErrorGin(ctx, err)
		return
	}

	createNotificationList := make([]schemas.NotificationWithSettings, 0, len(req.Receivers))
	for _, receiver := range req.Receivers {
		if req.Nature != "mentoring_way" && req.Nature != "own_way" {
			fmt.Printf("Nature not implemented: %s", req.Nature)
			continue
		}

		notificationRaw, isNotificationWasCreated, err := nc.notificationService.CreateNotification(ctx, &receiver, req.Nature)
		if err != nil {
			util.HandleErrorGin(ctx, err)
			return
		}

		description := lo.FromPtr(util.MarshalPgText(notificationRaw.Description))
		url := lo.FromPtr(util.MarshalPgText(notificationRaw.Url))
		createdAt := lo.FromPtr(util.MarshalPgTimestamp(notificationRaw.CreatedAt))

		notification := schemas.NotificationResponse{
			UUID:        util.ConvertPgUUIDToUUID(notificationRaw.Uuid).String(),
			UserUUID:    util.ConvertPgUUIDToUUID(notificationRaw.UserUuid).String(),
			IsRead:      notificationRaw.IsRead,
			Description: description,
			URL:         url,
			Nature:      string(notificationRaw.Nature),
			CreatedAt:   createdAt,
		}

		enabledSettings, err := nc.notificationService.GetEnabledSettingsByUser(ctx, receiver.UserUUID)
		if err != nil {
			util.HandleErrorGin(ctx, err)
			return
		}
		notificationSettingList := lo.Map(enabledSettings, func(s schemas.NotificationSettingResponse, _ int) schemas.NotificationSettingResponse {
			return schemas.NotificationSettingResponse{
				UUID:      s.UUID,
				UserUUID:  s.UserUUID,
				Nature:    s.Nature,
				Channel:   s.Channel,
				IsEnabled: bool(isNotificationWasCreated) && s.IsEnabled,
			}
		})

		createNotificationList = append(createNotificationList, schemas.NotificationWithSettings{
			Notification:            notification,
			NotificationSettingList: notificationSettingList,
		})
	}

	ctx.JSON(http.StatusOK, schemas.CreateNotificationsResponse{
		NotificationWithSettingsList: createNotificationList,
	})
}

func (nc *NotificationController) UpdateNotification(ctx *gin.Context) {
	notificationUUID := ctx.Param("notificationId")

	var req schemas.UpdateNotificationRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		util.HandleErrorGin(ctx, err)
		return
	}

	notification, err := nc.notificationService.UpdateNotification(ctx, notificationUUID, req.IsRead)
	if err != nil {
		util.HandleErrorGin(ctx, err)
		return
	}

	ctx.JSON(http.StatusOK, schemas.NotificationResponse{
		UUID:        notification.UUID,
		UserUUID:    notification.UserUUID,
		IsRead:      notification.IsRead,
		Description: notification.Description,
		URL:         notification.URL,
		Nature:      notification.Nature,
		CreatedAt:   notification.CreatedAt,
	})
}

func (nc *NotificationController) GetNotificationList(ctx *gin.Context) {
	userUUIDRaw, _ := ctx.Get(auth.ContextKeyUserID)
	userUUID := userUUIDRaw.(string)

	limit, _ := strconv.Atoi(ctx.DefaultQuery("limit", "10"))
	offset, _ := strconv.Atoi(ctx.DefaultQuery("offset", "0"))
	isOnlyNew, _ := strconv.ParseBool(ctx.DefaultQuery("isOnlyNew", "false"))

	getNotificationResponseRaw, err := nc.notificationService.GetNotificationList(ctx, userUUID, int32(limit), int32(offset), isOnlyNew)
	if err != nil {
		util.HandleErrorGin(ctx, err)
		return
	}

	ctx.JSON(http.StatusOK, getNotificationResponseRaw)
}