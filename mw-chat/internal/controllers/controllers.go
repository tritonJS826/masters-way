package controllers

import "mwchat/internal/services"

type Controller struct {
	RoomsController    *RoomsController
	MessagesController *MessagesController
	DevController      *DevController
}

func NewController(services *services.Service) *Controller {
	return &Controller{
		RoomsController:    NewRoomsController(services.IRoomsService),
		MessagesController: NewMessagesController(services.IMessagesService),
		DevController:      NewDevController(services.IDevService),
	}
}
