package routers

import (
	"mw-notification-bff/internal/controllers"

	"github.com/gin-gonic/gin"
)

type notificationRouter struct {
	notificationController *controllers.NotificationController
}

func newNotificationRouter(notificationController *controllers.NotificationController) *notificationRouter {
	return &notificationRouter{notificationController}
}

func (nr *notificationRouter) setNotificationRoutes(rg *gin.RouterGroup) {
	notifications := rg.Group("/notifications")
	{
		notifications.GET("", nr.notificationController.GetNotificationList)
		notifications.PATCH("/:notificationId", nr.notificationController.UpdateNotification)
	}
	notificationSettings := rg.Group("/notificationSettings")
	{
		notificationSettings.GET("", nr.notificationController.GetNotificationSettingList)
		notificationSettings.PATCH("/:notificationSettingId", nr.notificationController.UpdateNotificationSetting)
	}
}
