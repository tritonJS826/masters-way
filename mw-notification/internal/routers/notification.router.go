package routers

import (
	"mw-notification/internal/auth"
	"mw-notification/internal/controllers"

	"github.com/gin-gonic/gin"
)

type notificationRouter struct {
	notificationController *controllers.NotificationController
}

func newNotificationRouter(notificationController *controllers.NotificationController) *notificationRouter {
	return &notificationRouter{notificationController}
}

func (rr *notificationRouter) setNotificationRoutes(rg *gin.RouterGroup) {
	notifications := rg.Group("notifications", auth.AuthMiddleware())
	{
		notifications.POST("", rr.notificationController.CreateNotification)
		notifications.GET("", rr.notificationController.GetNotificationListByUserID)
		notifications.PATCH("/:notificationUuid", rr.notificationController.UpdateNotification)
	}
}
