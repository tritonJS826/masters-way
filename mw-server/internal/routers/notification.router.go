package routers

import (
	"mw-server/internal/auth"
	"mw-server/internal/config"
	"mw-server/internal/controllers"

	"github.com/gin-gonic/gin"
)

type notificationRouter struct {
	notificationController *controllers.NotificationController
	config                 *config.Config
}

func newNotificationRouter(notificationController *controllers.NotificationController, config *config.Config) *notificationRouter {
	return &notificationRouter{notificationController, config}
}

func (nr *notificationRouter) setNotificationRoutes(rg *gin.RouterGroup) {
	notifications := rg.Group("/notifications", auth.AuthMiddleware(nr.config))
	notifications.POST("", nr.notificationController.CreateNotifications)
	notifications.GET("", nr.notificationController.GetNotificationList)
	notifications.PATCH("/:notificationId", nr.notificationController.UpdateNotification)

	legacy := rg.Group("/notification/notifications", auth.AuthMiddleware(nr.config))
	legacy.POST("", nr.notificationController.CreateNotifications)
	legacy.GET("", nr.notificationController.GetNotificationList)
	legacy.PATCH("/:notificationId", nr.notificationController.UpdateNotification)
}