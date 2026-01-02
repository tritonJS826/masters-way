package controllers

import (
	"mw-server/internal/config"
	"mw-server/internal/services"
)

type Controller struct {
	AuthController                     *AuthController
	CommentController                  *CommentController
	CompanionController                *CompanionController
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
	ProjectController                  *ProjectController
	WayController                      *WayController
	WayTagController                   *WayTagController
	ToUserMentoringRequestController   *ToUserMentoringRequestController
	UserController                     *UserController
	UserContactController              *UserContactController
	UserTagController                  *UserTagController
	UserProjectController              *UserProjectController
	WayCollectionController            *WayCollectionController
	WayCollectionWayController         *WayCollectionWayController
	HealthCheckController              *HealthCheckController
}

func NewController(services *services.Service, config *config.Config) *Controller {
	return &Controller{
		AuthController:                     NewAuthController(services.AuthService, services.UserService, services.ProfileSettingService, config),
		CommentController:                  NewCommentController(services.PermissionService, services.CommentService),
		CompanionController:                NewCompanionController(services.GeminiService, services.DayReportService, services.WayService, services.CompanionFeedbackService, services.MetricService),
		CompositeWayController:             NewCompositeWayController(services.CompositeWayService),
		DayReportController:                NewDayReportController(services.DayReportService, services.LimitService, services.WayService),
		DevController:                      NewDevController(services.DevService),
		FavoriteUserController:             NewFavoriteUserController(services.FavoriteUserService),
		FavoriteUserWayController:          NewFavoriteUserWayController(services.FavoriteUserWayService),
		FromUserMentoringRequestController: NewFromUserMentoringRequestController(services.FromUserMentoringRequestService),
		GeminiController:                   NewGeminiController(services.LimitService, services.GeminiService, services.ProfileSettingService),
		JobDoneController:                  NewJobDoneController(services.PermissionService, services.JobDoneService, services.JobDoneJobTagService, services.JobTagService),
		JobDoneJobTagController:            NewJobDoneJobTagController(services.JobDoneJobTagService),
		JobTagController:                   NewJobTagController(services.JobTagService),
		MentorUserWayController:            NewMentorUserWayController(services.LimitService, services.MentorUserWayService),
		MetricController:                   NewMetricController(services.MetricService, services.WayService),
		PlanController:                     NewPlanController(services.PermissionService, services.PlanService, services.JobTagService),
		PlanJobTagController:               NewPlanJobTagController(services.PlanJobTagService),
		ProblemController:                  NewProblemController(services.PermissionService, services.ProblemService),
		ProjectController:                  NewProjectController(services.ProjectService, services.WayService, services.UserService),
		WayController:                      NewWayController(services.WayService, services.WayStatisticsService, services.DayReportService, services.LimitService),
		WayTagController:                   NewWayTagController(services.WayTagService),
		ToUserMentoringRequestController:   NewToUserMentoringRequestController(services.ToUserMentoringRequestService),
		UserController:                     NewUserController(services.UserService),
		UserContactController:              NewUserContactController(services.UserContactService),
		UserTagController:                  NewUserTagController(services.LimitService, services.UserTagService),
		UserProjectController:              NewUserProjectController(services.PermissionService, services.UserProjectService),
		WayCollectionController:            NewWayCollectionController(services.LimitService, services.WayCollectionService),
		WayCollectionWayController:         NewWayCollectionWayController(services.WayCollectionWayService),
		HealthCheckController:              NewHealthCheckController(),
	}
}
