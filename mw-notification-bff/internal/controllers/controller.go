package controllers

import "mw-notification-bff/internal/services"

type Controller struct {
	NotificationController *NotificationController
}

func NewController(services *services.Service) *Controller {
	return &Controller{
		NotificationController: NewNotificationController(services.GeneralService, services.FileService),
	}
}
