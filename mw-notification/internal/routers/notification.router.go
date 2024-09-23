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
	notifications := rg.Group("", auth.AuthMiddleware())
	notifications.GET("/users/:userId/list", rr.notificationController.GetNotificationListByUserId)
}
