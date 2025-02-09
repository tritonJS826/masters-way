package controllers

import (
	"mw-notification/internal/config"
	"mw-notification/internal/services"
)

type Controller struct {
	NotificationController        *NotificationController
	NotificationSettingController *NotificationSettingController
	DevController                 *DevController
}

func NewController(services *services.Service, config *config.Config) *Controller {
	return &Controller{
		NotificationController:        NewNotificationController(services.NotificationService, services.NotificationSettingService, config),
		NotificationSettingController: NewNotificationSettingController(services.NotificationSettingService),
		DevController:                 NewDevController(services.DevService),
	}
}
