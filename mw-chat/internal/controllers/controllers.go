package controllers

import "mwchat/internal/services"

type Controller struct {
	RoomsController *RoomsController
	DevController   *DevController
}

func NewController(services *services.Service) *Controller {
	return &Controller{
		RoomsController: NewRoomsController(services.RoomService),
		DevController:   NewDevController(services.DevService),
	}
}
