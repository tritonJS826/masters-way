package controllers

import "mwstorage/internal/services"

type Controller struct {
	MessagesController *MessageController
	DevController      *DevController
}

func NewController(services *services.Service) *Controller {
	return &Controller{
		MessagesController: NewMessagesController(services.MessagesService),
		DevController:      NewDevController(services.DevService),
	}
}
