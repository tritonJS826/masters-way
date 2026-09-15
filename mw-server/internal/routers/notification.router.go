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
	r := rg.Group("/notifications", auth.AuthMiddleware(nr.config))
	r.POST("", nr.notificationController.CreateNotifications)
	r.GET("", nr.notificationController.GetNotificationList)
	r.PATCH("/:notificationId", nr.notificationController.UpdateNotification)
}