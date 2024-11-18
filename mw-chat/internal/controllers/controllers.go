package controllers

import "mw-chat/internal/services"

type Controller struct {
	RoomsController    *RoomController
	MessagesController *MessageController
	DevController      *DevController
}

func NewController(services *services.Service) *Controller {
	return &Controller{
		RoomsController:    NewRoomsController(services.RoomsService),
		MessagesController: NewMessagesController(services.MessagesService),
		DevController:      NewDevController(services.DevService),
	}
}
