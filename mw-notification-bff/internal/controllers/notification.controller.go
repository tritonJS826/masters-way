package controllers

import (
	"mw-notification-bff/internal/auth"
	"mw-notification-bff/internal/schemas"
	"mw-notification-bff/internal/services"
	utils "mw-notification-bff/internal/utils"
	"net/http"
	"strconv"

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
// @Param page query integer false "Page number for pagination - 1 by default"
// @Param limit query integer false "Number of items per page - 50 by default"
// @Param isOnlyNew query boolean false "Get only new notifications - false by default"
// @Success 200 {object} schemas.GetNotificationListResponse
// @Router /notifications [get]
func (nc *NotificationController) GetNotificationList(ctx *gin.Context) {
	userUUID := ctx.Value(auth.ContextKeyUserID).(string)
	page := ctx.DefaultQuery("page", "1")
	limit := ctx.DefaultQuery("limit", "50")
	isOnlyNew := ctx.DefaultQuery("isOnlyNew", "false")

	reqPage, _ := strconv.Atoi(page)
	reqLimit, _ := strconv.Atoi(limit)
	reqIsOnlyNew, err := strconv.ParseBool(isOnlyNew)

	getNotificationListParams := &services.GetNotificationListParams{
		UserUUID:  userUUID,
		Page:      int32(reqPage),
		Limit:     int32(reqLimit),
		IsOnlyNew: reqIsOnlyNew,
	}

	response, err := nc.notificationService.GetNotificationList(ctx, getNotificationListParams)
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

	response, err := nc.notificationService.UpdateNotification(ctx, notificationUUID, payload.IsRead)
	utils.HandleErrorGin(ctx, err)

	ctx.JSON(http.StatusOK, response)
}

// Get notificationSetting list handler
// @Summary Get notificationSetting list by user id
// @Description
// @Tags notificationSetting
// @ID get-notificationSetting-list
// @Accept json
// @Produce json
// @Success 200 {object} schemas.GetNotificationSettingListResponse
// @Router /notificationSettings [get]
func (nc *NotificationController) GetNotificationSettingList(ctx *gin.Context) {
	userUUID := ctx.Value(auth.ContextKeyUserID).(string)
	response, err := nc.notificationService.GetNotificationSettingList(ctx, userUUID)
	utils.HandleErrorGin(ctx, err)

	ctx.JSON(http.StatusOK, response)
}

// Update notificationSetting handler
// @Summary Update notificationSetting by id
// @Description
// @Tags notificationSetting
// @ID update-notificationSetting
// @Accept json
// @Produce json
// @Param request body schemas.UpdateNotificationSettingPayload true "query params"
// @Param notificationSettingId path string true "notification id"
// @Success 200 {object} schemas.NotificationSettingResponse
// @Router /notificationSettings/{notificationSettingId} [patch]
func (nc *NotificationController) UpdateNotificationSetting(ctx *gin.Context) {
	var payload *schemas.UpdateNotificationSettingPayload

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "Failed payload", "error": err.Error()})
		return
	}

	notificationID := ctx.Param("notificationSettingId")

	response, err := nc.notificationService.UpdateNotificationSetting(ctx, notificationID, payload.IsEnabled)
	utils.HandleErrorGin(ctx, err)

	ctx.JSON(http.StatusOK, response)
}
