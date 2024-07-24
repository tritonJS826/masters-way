package controllers

import "mw-chat-bff/internal/services"

type Controller struct {
	RoomsController *RoomsController
}

func NewController() *Controller {
	return &Controller{
		RoomsController: NewRoomsController(services.NewRoomsService()),
	}
}
