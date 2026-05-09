package controllers

import (
	"mw-general-bff/internal/facades"
	"mw-general-bff/internal/schemas"
	"mw-general-bff/pkg/utils"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

type NotificationController struct {
	notificationFacade *facades.NotificationFacade
}

func NewNotificationController(notificationFacade *facades.NotificationFacade) *NotificationController {
	return &NotificationController{notificationFacade}
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
// @Router /general/notifications [get]
func (nc *NotificationController) GetNotificationList(ctx *gin.Context) {
	userUUID := ctx.Value("userID").(string)

	page := int32(1)
	if pageStr := ctx.Query("page"); pageStr != "" {
		if p, err := strconv.Atoi(pageStr); err == nil {
			page = int32(p)
		}
	}

	limit := int32(50)
	if limitStr := ctx.Query("limit"); limitStr != "" {
		if l, err := strconv.Atoi(limitStr); err == nil {
			limit = int32(l)
		}
	}

	isOnlyNew := false
	if isOnlyNewStr := ctx.Query("isOnlyNew"); isOnlyNewStr != "" {
		isOnlyNew, _ = strconv.ParseBool(isOnlyNewStr)
	}

	response, err := nc.notificationFacade.GetNotificationList(ctx, userUUID, page, limit, isOnlyNew)
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
// @Router /general/notifications/{notificationId} [patch]
func (nc *NotificationController) UpdateNotification(ctx *gin.Context) {
	var payload *schemas.UpdateNotificationPayload
	notificationUUID := ctx.Param("notificationId")

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "Failed payload", "error": err.Error()})
		return
	}

	response, err := nc.notificationFacade.UpdateNotification(ctx, notificationUUID, payload.IsRead)
	utils.HandleErrorGin(ctx, err)

	ctx.JSON(http.StatusOK, response)
}

// Get notificationSetting list handler
// @Summary Get notificationSetting list by user id
// @Description
// @Tags notification
// @ID get-notificationSetting-list
// @Accept json
// @Produce json
// @Success 200 {object} schemas.GetNotificationSettingListResponse
// @Router /general/notificationSettings [get]
func (nc *NotificationController) GetNotificationSettingList(ctx *gin.Context) {
	userUUID := ctx.Value("userID").(string)
	response, err := nc.notificationFacade.GetNotificationSettingList(ctx, userUUID)
	utils.HandleErrorGin(ctx, err)

	ctx.JSON(http.StatusOK, response)
}

// Update notificationSetting handler
// @Summary Update notificationSetting by id
// @Description
// @Tags notification
// @ID update-notificationSetting
// @Accept json
// @Produce json
// @Param request body schemas.UpdateNotificationSettingPayload true "query params"
// @Param notificationSettingId path string true "notification id"
// @Success 200 {object} schemas.NotificationSettingResponse
// @Router /general/notificationSettings/{notificationSettingId} [patch]
func (nc *NotificationController) UpdateNotificationSetting(ctx *gin.Context) {
	var payload *schemas.UpdateNotificationSettingPayload

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "Failed payload", "error": err.Error()})
		return
	}

	notificationID := ctx.Param("notificationSettingId")

	response, err := nc.notificationFacade.UpdateNotificationSetting(ctx, notificationID, payload.IsEnabled)
	utils.HandleErrorGin(ctx, err)

	ctx.JSON(http.StatusOK, response)
}