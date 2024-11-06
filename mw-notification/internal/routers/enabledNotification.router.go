package routers

import (
	"mw-notification/internal/auth"
	"mw-notification/internal/controllers"

	"github.com/gin-gonic/gin"
)

type enabledNotificationRouter struct {
	enabledNotificationController *controllers.EnabledNotificationController
}

func newEnabledNotificationRouter(enabledNotificationController *controllers.EnabledNotificationController) *enabledNotificationRouter {
	return &enabledNotificationRouter{enabledNotificationController}
}

func (er *enabledNotificationRouter) setEnabledNotificationRoutes(rg *gin.RouterGroup) {
	notifications := rg.Group("enabledNotifications", auth.AuthMiddleware())
	{
		notifications.POST("", er.enabledNotificationController.CreateEnabledNotifications)
		notifications.GET("", er.enabledNotificationController.GetEnabledNotificationList)
		notifications.PATCH("/:enabledNotificationUuid", er.enabledNotificationController.UpdateEnabledNotification)
	}
}
