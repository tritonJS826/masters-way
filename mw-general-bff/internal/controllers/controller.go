package controllers

import "mw-general-bff/internal/services"

type Controller struct {
	FileController                     *FileController
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
	ProjectController                  *ProjectController
	WayController                      *WayController
	WayTagController                   *WayTagController
	ToUserMentoringRequestController   *ToUserMentoringRequestController
	UserController                     *UserController
	UserTagController                  *UserTagController
	UserProjectController              *UserProjectController
	WayCollectionController            *WayCollectionController
	WayCollectionWayController         *WayCollectionWayController
	HealthCheckController              *HealthCheckController
}

func NewController(services *services.Service) *Controller {
	return &Controller{
		FileController: NewFileController(services.GeneralService, services.FileService),
		//AuthController:                     NewAuthController(services.AuthService, services.UserService, config),
		CommentController:                  NewCommentController(services.GeneralService),
		CompositeWayController:             NewCompositeWayController(services.GeneralService),
		DayReportController:                NewDayReportController(services.GeneralService),
		DevController:                      NewDevController(services.GeneralService),
		FavoriteUserController:             NewFavoriteUserController(services.GeneralService),
		FavoriteUserWayController:          NewFavoriteUserWayController(services.GeneralService),
		FromUserMentoringRequestController: NewFromUserMentoringRequestController(services.GeneralService),
		GeminiController:                   NewGeminiController(services.GeneralService),
		JobDoneController:                  NewJobDoneController(services.GeneralService),
		JobDoneJobTagController:            NewJobDoneJobTagController(services.GeneralService),
		JobTagController:                   NewJobTagController(services.GeneralService),
		MentorUserWayController:            NewMentorUserWayController(services.GeneralService),
		MetricController:                   NewMetricController(services.GeneralService),
		PlanController:                     NewPlanController(services.GeneralService),
		PlanJobTagController:               NewPlanJobTagController(services.GeneralService),
		ProblemController:                  NewProblemController(services.GeneralService),
		ProjectController:                  NewProjectController(services.GeneralService),
		WayController:                      NewWayController(services.GeneralService),
		WayTagController:                   NewWayTagController(services.GeneralService),
		ToUserMentoringRequestController:   NewToUserMentoringRequestController(services.GeneralService),
		UserController:                     NewUserController(services.GeneralService),
		UserTagController:                  NewUserTagController(services.GeneralService),
		UserProjectController:              NewUserProjectController(services.GeneralService),
		WayCollectionController:            NewWayCollectionController(services.GeneralService),
		WayCollectionWayController:         NewWayCollectionWayController(services.GeneralService),
		HealthCheckController:              NewHealthCheckController(),
	}
}
