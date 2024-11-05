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
// @Router /enabledNotifications [post]
func (ec *EnabledNotificationController) CreateEnabledNotifications(ctx *gin.Context) {
	userIDRaw, _ := ctx.Get(auth.ContextKeyUserID)
	userUUID := uuid.MustParse(userIDRaw.(string))

	err := ec.enabledNotificationService.CreateEnabledNotifications(ctx, userUUID)
	utils.HandleErrorGin(ctx, err)

	ctx.Status(http.StatusNoContent)
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
func (ec *EnabledNotificationController) UpdateEnabledNotification(ctx *gin.Context) {
	var payload *schemas.UpdateEnabledNotificationPayload

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "Failed payload", "error": err.Error()})
		return
	}

	notificationID := ctx.Param("enabledNotificationId")

	params := &services.UpdateEnabledNotificationParams{
		EnabledNotificationUUID: uuid.MustParse(notificationID),
		IsEnabled:               payload.IsEnabled,
	}

	response, err := ec.enabledNotificationService.UpdateEnabledNotification(ctx, params)
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
func (ec *EnabledNotificationController) GetEnabledNotificationList(ctx *gin.Context) {
	userIDRaw, _ := ctx.Get(auth.ContextKeyUserID)
	userUUID := uuid.MustParse(userIDRaw.(string))

	response, err := ec.enabledNotificationService.GetEnabledNotificationListByUserID(ctx, userUUID)
	utils.HandleErrorGin(ctx, err)

	ctx.JSON(http.StatusOK, response)
}
