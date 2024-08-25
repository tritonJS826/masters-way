package controllers

import (
	"mwserver/internal/services"
)

type Controller struct {
	AuthController                     *AuthController
	CommentController                  *CommentController
	CompositeWayController             *CompositeWayController
	DayReportController                *DayReportController
	DevController                      *DevController
	FavoriteUserController             *FavoriteUserController
	FavoriteUserWayController          *FavoriteUserWayController
	FromUserMentoringRequestController *FromUserMentoringRequestController
	GeminiController                   *GeminiController
	JobDoneController                  *JobDoneController
	JobDoneJobTagController            *JobDoneJobTagController
	JobTagController                   *JobTagController
	MentorUserWayController            *MentorUserWayController
	MetricController                   *MetricController
	PlanController                     *PlanController
	PlanJobTagController               *PlanJobTagController
	ProblemController                  *ProblemController
	WayController                      *WayController
	WayTagController                   *WayTagController
	ToUserMentoringRequestController   *ToUserMentoringRequestController
	UserController                     *UserController
	UserTagController                  *UserTagController
	WayCollectionController            *WayCollectionController
	WayCollectionWayController         *WayCollectionWayController
}

func NewController(services *services.Service) *Controller {
	return &Controller{
		AuthController:                     NewAuthController(services.UserService),
		CommentController:                  NewCommentController(services.PermissionService, services.CommentService),
		CompositeWayController:             NewCompositeWayController(services.CompositeWayService),
		DayReportController:                NewDayReportController(services.DayReportService, services.LimitService, services.WayService),
		DevController:                      NewDevController(services.DevService),
		FavoriteUserController:             NewFavoriteUserController(services.FavoriteUserService),
		FavoriteUserWayController:          NewFavoriteUserWayController(services.FavoriteUserWayService),
		FromUserMentoringRequestController: NewFromUserMentoringRequestController(services.FromUserMentoringRequestService),
		GeminiController:                   NewGeminiController(services.GeminiService),
		JobDoneController:                  NewJobDoneController(services.PermissionService, services.JobDoneService),
		JobDoneJobTagController:            NewJobDoneJobTagController(services.JobDoneJobTagService),
		JobTagController:                   NewJobTagController(services.JobTagService),
		MentorUserWayController:            NewMentorUserWayController(services.LimitService, services.MentorUserWayService),
		MetricController:                   NewMetricController(services.MetricService, services.WayService),
		PlanController:                     NewPlanController(services.PermissionService, services.PlanService),
		PlanJobTagController:               NewPlanJobTagController(services.PlanJobTagService),
		ProblemController:                  NewProblemController(services.PermissionService, services.ProblemService),
		WayController:                      NewWayController(services.WayService, services.WayStatisticsService, services.DayReportService, services.LimitService),
		WayTagController:                   NewWayTagController(services.WayTagService),
		ToUserMentoringRequestController:   NewToUserMentoringRequestController(services.ToUserMentoringRequestService),
		UserController:                     NewUserController(services.UserService),
		UserTagController:                  NewUserTagController(services.LimitService, services.UserTagService),
		WayCollectionController:            NewWayCollectionController(services.LimitService, services.WayCollectionService),
		WayCollectionWayController:         NewWayCollectionWayController(services.WayCollectionWayService),
	}
}
