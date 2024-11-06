package controllers

import "mw-notification/internal/services"

type Controller struct {
	NotificationController        *NotificationController
	EnabledNotificationController *EnabledNotificationController
	DevController                 *DevController
}

func NewController(services *services.Service) *Controller {
	return &Controller{
		NotificationController:        NewNotificationController(services.NotificationService),
		EnabledNotificationController: NewEnabledNotificationController(services.EnabledNotificationService),
		DevController:                 NewDevController(services.DevService),
	}
}
