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
	enabledNotifications := rg.Group("/enabledNotifications")
	{
		enabledNotifications.GET("", nr.notificationController.GetEnabledNotificationList)
		enabledNotifications.PATCH("/:enabledNotificationId", nr.notificationController.UpdateEnabledNotification)
	}
}
