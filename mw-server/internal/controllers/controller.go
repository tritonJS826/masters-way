package controllers

import (
	"mwserver/internal/services"
)

type Controller struct {
	AuthController            *AuthController
	CommentController         *CommentController
	WayTagController          *WayTagController
	CompositeWayController    *CompositeWayController
	DayReportController       *DayReportController
	DevController             *DevController
	FavoriteUserController    *FavoriteUserController
	FavoriteUserWayController *FavoriteUserWayController
}

func NewController(services *services.Service) *Controller {
	return &Controller{
		AuthController:            NewAuthController(services.IUserService),
		CommentController:         NewCommentController(services.ICommentService),
		WayTagController:          NewWayTagController(services.IWayTagService),
		CompositeWayController:    NewCompositeWayController(services.ICompositeWayService),
		DayReportController:       NewDayReportController(services.IDayReportService, services.ILimitService, services.IWayService),
		DevController:             NewDevController(services.IDevService),
		FavoriteUserController:    NewFavoriteUserController(services.IFavoriteUserService),
		FavoriteUserWayController: NewFavoriteUserWayController(services.IFavoriteUserWayService),
	}
}
