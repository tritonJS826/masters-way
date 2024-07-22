package controllers

import "mwchat/internal/services"

type Controller struct {
	P2PRoomsController   *P2PRoomsController
	GroupRoomsController *GroupRoomsController
}

func NewController(services *services.Service) *Controller {
	return &Controller{
		P2PRoomsController:   NewP2PRoomsController(services.P2PService),
		GroupRoomsController: NewGroupRoomsController(),
	}
}
