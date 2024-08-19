package controllers

import "mw-chat-bff/internal/services"

type Controller struct {
	RoomsController    *RoomsController
	MessagesController *MessagesController
}

func NewController(services *services.Service) *Controller {
	return &Controller{
		RoomsController:    NewRoomsController(services.IRoomsService, services.IUsersService, services.IMWChatWebSocketService),
		MessagesController: NewMessagesController(services.IMessagesService),
	}
}
