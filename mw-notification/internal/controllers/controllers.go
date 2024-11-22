package controllers

import "mw-notification/internal/services"

type Controller struct {
	NotificationController        *NotificationController
	NotificationSettingController *NotificationSettingController
	DevController                 *DevController
}

func NewController(services *services.Service) *Controller {
	return &Controller{
		NotificationController:        NewNotificationController(services.NotificationService, services.NotificationSettingService),
		NotificationSettingController: NewNotificationSettingController(services.NotificationSettingService),
		DevController:                 NewDevController(services.DevService),
	}
}
