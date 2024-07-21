package controllers

type Controller struct {
	P2PRoomsController   *P2PRoomsController
	GroupRoomsController *GroupRoomsController
}

func NewController() *Controller {
	return &Controller{
		P2PRoomsController:   NewP2PRoomsController(),
		GroupRoomsController: NewGroupRoomsController(),
	}
}
