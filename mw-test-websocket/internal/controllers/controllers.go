package controllers

import (
	"mw-test-websocket/internal/services"
)

type Controller struct {
	SocketController *SocketController
}

func NewController(services *services.Service) *Controller {
	return &Controller{
		SocketController: NewSocketController(services.GeneralService),
	}
}
