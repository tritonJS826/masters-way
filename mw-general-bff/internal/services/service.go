package services

import (
	"mw-general-bff/internal/config"
	"mw-general-bff/internal/openapi"
)

type Service struct {
	GeneralService *GeneralService
	FileService    *FileService
	// AuthService                     *AuthService
	// CommentService                  *CommentService
	// CompositeWayService             *CompositeWayService
	// DayReportService                *DayReportService
	// DevService                      *DevService
	// FavoriteUserService             *FavoriteUserService
	// FavoriteUserWayService          *FavoriteUserWayService
	// FromUserMentoringRequestService *FromUserMentoringRequestService
	// GeminiService                   *GeminiService
	// PermissionService               *PermissionService
	// JobDoneService                  *JobDoneService
	// JobDoneJobTagService            *JobDoneJobTagService
	// JobTagService                   *JobTagService
	// LimitService                    *LimitService
	// MentorUserWayService            *MentorUserWayService
	// MetricService                   *MetricService
	// PlanService                     *PlanService
	// PlanJobTagService               *PlanJobTagService
	// ProblemService                  *ProblemService
	// ProjectService                  *ProjectService
	// UserService                     *UserService
	// WayService                      *WayService
	// WayStatisticsService            *WayStatisticsService
	// WayTagService                   *WayTagService
	// ToUserMentoringRequestService   *ToUserMentoringRequestService
	// UserTagService                  *UserTagService
	// UserProjectService              *UserProjectService
	// WayCollectionService            *WayCollectionService
	// WayCollectionWayService         *WayCollectionWayService
}

func NewService(config *config.Config) *Service {
	var generalApi = openapi.MakeGeneralAPIClient(config)
	var storageApi = openapi.MakeStorageAPIClient(config)

	return &Service{
		GeneralService: NewGeneralService(generalApi),
		FileService:    NewFileService(storageApi),
		// AuthService:                     newAuthService(),
		// CommentService:                  NewCommentService(),
		// CompositeWayService:             NewCompositeWayService(),
		// DayReportService:                NewDayReportService(),
		// DevService:                      NewDevService(),
		// FavoriteUserService:             NewFavoriteUserService(),
		// FavoriteUserWayService:          NewFavoriteUserWayService(),
		// FromUserMentoringRequestService: NewFromUserMentoringRequestService(),
		// GeminiService:                   NewGeminiService(geminiClient, config),
		// PermissionService:               NewPermissionService(),
		// JobDoneService:                  NewJobDoneService(),
		// JobDoneJobTagService:            NewJobDoneJobTagService(),
		// JobTagService:                   NewJobTagService(),
		// LimitService:                    NewLimitService(),
		// MentorUserWayService:            NewMentorUserWayService(),
		// MetricService:                   NewMetricService(),
		// PlanService:                     NewPlanService(),
		// PlanJobTagService:               NewPlanJobTagService(),
		// ProblemService:                  NewProblemService(),
		// ProjectService:                  NewProjectService(),
		// UserService:                     NewUserService(),
		// UserProjectService:              NewUserProjectService(),
		// WayService:                      NewWayService(),
		// WayStatisticsService:            NewWayStatisticsService(),
		// WayTagService:                   NewWayTagService(),
		// ToUserMentoringRequestService:   NewToUserMentoringRequestService(),
		// UserTagService:                  NewUserTagService(),
		// WayCollectionService:            NewWayCollectionService(),
		// WayCollectionWayService:         NewWayCollectionWayService(),
	}
}

type PopulatedUser struct {
	UserID   string
	Name     string
	ImageURL string
}
