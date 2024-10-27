package routers

import (
	"mwnotification/internal/auth"
	"mwnotification/internal/controllers"

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
		notifications.PATCH("/:notificationId", rr.notificationController.UpdateNotification)
	}
}
