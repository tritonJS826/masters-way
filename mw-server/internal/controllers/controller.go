package controllers

import (
	"mwserver/internal/config"
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
	JobDoneJobTagController            *JobDoneLabelController
	JobTagController                   *LabelController
	MentorUserWayController            *MentorUserWayController
	MetricController                   *MetricController
	PlanController                     *PlanController
	PlanJobTagController               *PlanLabelController
	ProblemController                  *ProblemController
	ProjectController                  *ProjectController
	WayController                      *WayController
	WayTagController                   *WayTagController
	ToUserMentoringRequestController   *ToUserMentoringRequestController
	UserController                     *UserController
	UserTagController                  *UserTagController
	WayCollectionController            *WayCollectionController
	WayCollectionWayController         *WayCollectionWayController
	HealthCheckController              *HealthCheckController
}

func NewController(services *services.Service, config *config.Config) *Controller {
	return &Controller{
		AuthController:                     NewAuthController(services.AuthService, services.UserService, config),
		CommentController:                  NewCommentController(services.PermissionService, services.CommentService),
		CompositeWayController:             NewCompositeWayController(services.CompositeWayService),
		DayReportController:                NewDayReportController(services.DayReportService, services.LimitService, services.WayService),
		DevController:                      NewDevController(services.DevService),
		FavoriteUserController:             NewFavoriteUserController(services.FavoriteUserService),
		FavoriteUserWayController:          NewFavoriteUserWayController(services.FavoriteUserWayService),
		FromUserMentoringRequestController: NewFromUserMentoringRequestController(services.FromUserMentoringRequestService),
		GeminiController:                   NewGeminiController(services.GeminiService),
		JobDoneController:                  NewJobDoneController(services.PermissionService, services.JobDoneService),
		JobDoneJobTagController:            NewJobDoneJobTagController(services.JobDoneLabelService),
		JobTagController:                   NewLabelController(services.JobTagService),
		MentorUserWayController:            NewMentorUserWayController(services.LimitService, services.MentorUserWayService),
		MetricController:                   NewMetricController(services.MetricService, services.WayService),
		PlanController:                     NewPlanController(services.PermissionService, services.PlanService),
		PlanJobTagController:               NewPlanLabelController(services.PlanJobTagService),
		ProblemController:                  NewProblemController(services.PermissionService, services.ProblemService),
		ProjectController:                  NewProjectController(services.ProjectService, services.WayService, services.UserService),
		WayController:                      NewWayController(services.WayService, services.WayStatisticsService, services.DayReportService, services.LimitService),
		WayTagController:                   NewWayTagController(services.WayTagService),
		ToUserMentoringRequestController:   NewToUserMentoringRequestController(services.ToUserMentoringRequestService),
		UserController:                     NewUserController(services.UserService),
		UserTagController:                  NewUserTagController(services.LimitService, services.UserTagService),
		WayCollectionController:            NewWayCollectionController(services.LimitService, services.WayCollectionService),
		WayCollectionWayController:         NewWayCollectionWayController(services.WayCollectionWayService),
		HealthCheckController:              NewHealthCheckController(),
	}
}
