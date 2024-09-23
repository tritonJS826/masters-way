package controllers

import "mwnotification/internal/services"

type Controller struct {
	NotificationController *NotificationController
	DevController          *DevController
}

func NewController(services *services.Service) *Controller {
	return &Controller{
		NotificationController: NewNotificationController(services.NotificationService),
		DevController:          NewDevController(services.DevService),
	}
}
