package controllers

import (
	"mwserver/internal/services"
)

type Controller struct {
	AuthController         *AuthController
	CommentController      *CommentController
	WayTagController       *WayTagController
	CompositeWayController *CompositeWayController
	DayReportController    *DayReportController
}

func NewController(services *services.Service) *Controller {
	return &Controller{
		AuthController:         NewAuthController(services.IUserService),
		CommentController:      NewCommentController(services.ICommentService),
		WayTagController:       NewWayTagController(services.IWayTagService),
		CompositeWayController: NewCompositeWayController(services.ICompositeWayService),
		DayReportController:    NewDayReportController(services.IDayReportService, services.ILimitService, services.IWayService),
	}
}
