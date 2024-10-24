package routers

import (
	"mwnotification/internal/auth"
	"mwnotification/internal/controllers"

	"github.com/gin-gonic/gin"
)

type enabledNotificationRouter struct {
	enabledNotificationController *controllers.EnabledNotificationController
}

func newEnabledNotificationRouter(enabledNotificationController *controllers.EnabledNotificationController) *enabledNotificationRouter {
	return &enabledNotificationRouter{enabledNotificationController}
}

func (er *enabledNotificationRouter) setEnabledNotificationRoutes(rg *gin.RouterGroup) {
	notifications := rg.Group("enabled-notifications", auth.AuthMiddleware())
	{
		notifications.POST("", er.enabledNotificationController.CreateEnabledNotification)
	}
}
