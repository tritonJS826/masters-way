package controllers

import "mw-chat-bff/internal/services"

type Controller struct {
	RoomsController *RoomsController
}

func NewController(services *services.Service) *Controller {
	return &Controller{
		RoomsController: NewRoomsController(services.IRoomsService, services.IUsersService),
	}
}
