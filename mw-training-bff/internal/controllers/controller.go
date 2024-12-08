package controllers

import "mw-training-bff/internal/services"

type Controller struct {
	FileController     *FileController
	RoomsController    *RoomController
	MessagesController *MessageController
}

func NewController(services *services.Service) *Controller {
	return &Controller{
		FileController:     NewFileController(services.GeneralService, services.FileService, services.ChatService),
		RoomsController:    NewRoomsController(services.GeneralService, services.ChatService),
		MessagesController: NewMessageController(services.GeneralService, services.ChatService),
	}
}
