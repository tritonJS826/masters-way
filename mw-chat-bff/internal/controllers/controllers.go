package controllers

import "mw-chat-bff/internal/services"

type Controller struct {
	P2PRoomsController   *P2PRoomsController
	GroupRoomsController *GroupRoomsController
}

func NewController() *Controller {
	return &Controller{
		P2PRoomsController:   NewP2PRoomsController(services.NewP2PRoomsService()),
		GroupRoomsController: NewGroupRoomsController(),
	}
}
