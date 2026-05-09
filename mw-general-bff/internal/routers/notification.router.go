package routers

import (
	"mw-general-bff/internal/auth"
	"mw-general-bff/internal/config"
	"mw-general-bff/internal/controllers"

	"github.com/gin-gonic/gin"
)

type notificationRouter struct {
	notificationController *controllers.NotificationController
	config                  *config.Config
}

func newNotificationRouter(notificationController *controllers.NotificationController, config *config.Config) *notificationRouter {
	return &notificationRouter{notificationController, config}
}

func (nr *notificationRouter) setNotificationRoutes(rg *gin.RouterGroup) {
	router := rg.Group("/notification")
	router.Use(auth.HandleHeaders(nr.config))
	{
		router.GET("/notifications", nr.notificationController.GetNotificationList)
		router.PATCH("/notifications/:notificationId", nr.notificationController.UpdateNotification)
		router.GET("/notificationSettings", nr.notificationController.GetNotificationSettingList)
		router.PATCH("/notificationSettings/:notificationSettingId", nr.notificationController.UpdateNotificationSetting)
	}
}