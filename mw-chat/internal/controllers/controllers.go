package controllers

import "mwchat/internal/services"

type Controller struct {
	RoomsController *RoomsController
}

func NewController(services *services.Service) *Controller {
	return &Controller{
		RoomsController: NewP2PRoomsController(services.RoomService),
	}
}
