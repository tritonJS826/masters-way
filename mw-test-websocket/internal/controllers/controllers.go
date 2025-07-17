package controllers

import "mw-test-websocket/internal/services"

type Controller struct {
	SocketController *SocketController
}

func NewController() *Controller {
	return &Controller{
		SocketController: NewSocketController(*services.NewSocketService()),
	}
}
