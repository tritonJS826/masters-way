package controllers

import "mw-chat-bff/internal/services"

type Controller struct {
	FileController     *FileController
	RoomsController    *RoomController
	MessagesController *MessageController
}

func NewController(services *services.Service) *Controller {
	return &Controller{
		FileController:     NewFileController(services.GeneralService, services.FileService, services.ChatService, services.ChatWebSocketService),
		RoomsController:    NewRoomsController(services.GeneralService, services.ChatService, services.ChatWebSocketService),
		MessagesController: NewMessageController(services.GeneralService, services.ChatService, services.ChatWebSocketService),
	}
}
