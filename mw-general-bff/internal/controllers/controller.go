package controllers

import (
	"mw-general-bff/internal/facades"
)

type Controller struct {
	FileController                     *FileController
	AuthController                     *AuthController
	CommentController                  *CommentController
	CompositeWayController             *CompositeWayController
	DayReportController                *DayReportController
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
	QuestionResultController           *QuestionResultController
}

func NewController(facade *facades.Facade) *Controller {
	return &Controller{
		AuthController:                     NewAuthController(facade.AuthFacade),
		FileController:                     NewFileController(facade.FileFacade),
		CommentController:                  NewCommentController(facade.CommentFacade),
		CompositeWayController:             NewCompositeWayController(facade.CompositeWayFacade),
		DayReportController:                NewDayReportController(facade.DayReportFacade),
		FavoriteUserController:             NewFavoriteUserController(facade.FavoriteUserFacade),
		FavoriteUserWayController:          NewFavoriteUserWayController(facade.FavoriteUserWayFacade),
		FromUserMentoringRequestController: NewFromUserMentoringRequestController(facade.FromUserMentoringRequestFacade),
		GeminiController:                   NewGeminiController(facade.GeminiFacade),
		JobDoneController:                  NewJobDoneController(facade.JobDoneFacade),
		JobDoneJobTagController:            NewJobDoneJobTagController(facade.JobDoneJobTagFacade),
		JobTagController:                   NewJobTagController(facade.JobTagFacade),
		MentorUserWayController:            NewMentorUserWayController(facade.MentorUserWayFacade),
		MetricController:                   NewMetricController(facade.MetricFacade),
		PlanController:                     NewPlanController(facade.PlanFacade),
		PlanJobTagController:               NewPlanJobTagController(facade.PlanJobTagFacade),
		ProblemController:                  NewProblemController(facade.ProblemFacade),
		ProjectController:                  NewProjectController(facade.ProjectFacade),
		WayController:                      NewWayController(facade.WayFacade),
		WayTagController:                   NewWayTagController(facade.WayTagFacade),
		ToUserMentoringRequestController:   NewToUserMentoringRequestController(facade.ToUserMentoringRequestFacade),
		UserController:                     NewUserController(facade.UserFacade),
		UserContactController:              NewUserContactController(facade.UserContactFacade),
		UserTagController:                  NewUserTagController(facade.UserTagFacade),
		UserProjectController:              NewUserProjectController(facade.UserProjectFacade),
		WayCollectionController:            NewWayCollectionController(facade.WayCollectionFacade),
		WayCollectionWayController:         NewWayCollectionWayController(facade.WayCollectionWayFacade),
		HealthCheckController:              NewHealthCheckController(facade.HealthCheckFacade),
		// for training
		QuestionResultController: NewQuestionResultController(facade.QuestionResultFacade),
	}
}
