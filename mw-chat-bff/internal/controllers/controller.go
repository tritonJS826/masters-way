package controllers

import "mw-chat-bff/internal/services"

type Controller struct {
	RoomsController    *RoomController
	MessagesController *MessageController
}

func NewController(services *services.Service) *Controller {
	return &Controller{
		RoomsController:    NewRoomsController(services.GeneralService, services.ChatService, services.ChatWebSocketService),
		MessagesController: NewMessageController(services.GeneralService, services.ChatService, services.ChatWebSocketService),
	}
}
