package routers

import (
	"mw-server/internal/auth"
	"mw-server/internal/config"
	"mw-server/internal/controllers"

	"github.com/gin-gonic/gin"
)

type notificationSettingRouter struct {
	notificationSettingController *controllers.NotificationSettingController
	config                        *config.Config
}

func newNotificationSettingRouter(notificationSettingController *controllers.NotificationSettingController, config *config.Config) *notificationSettingRouter {
	return &notificationSettingRouter{notificationSettingController, config}
}

func (nsr *notificationSettingRouter) setNotificationSettingRoutes(rg *gin.RouterGroup) {
	r := rg.Group("/notification/notification-settings", auth.AuthMiddleware(nsr.config))
	r.POST("", nsr.notificationSettingController.CreateNotificationSettings)
	r.GET("", nsr.notificationSettingController.GetNotificationSettingList)
	r.PATCH("/:notificationSettingId", nsr.notificationSettingController.UpdateNotificationSetting)
}