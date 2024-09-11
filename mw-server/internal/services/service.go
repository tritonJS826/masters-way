package services

import (
	"mwserver/internal/auth"
	"mwserver/internal/config"
	db "mwserver/internal/db/sqlc"

	"github.com/google/generative-ai-go/genai"
	"github.com/jackc/pgx/v5/pgxpool"
)

type Service struct {
	AuthService                     *AuthService
	CommentService                  *CommentService
	CompositeWayService             *CompositeWayService
	DayReportService                *DayReportService
	DevService                      *DevService
	FavoriteUserService             *FavoriteUserService
	FavoriteUserWayService          *FavoriteUserWayService
	FromUserMentoringRequestService *FromUserMentoringRequestService
	GeminiService                   *GeminiService
	PermissionService               *PermissionService
	JobDoneService                  *JobDoneService
	JobDoneLabelService             *JobDoneLabelService
	JobTagService                   *LabelService
	LimitService                    *LimitService
	MentorUserWayService            *MentorUserWayService
	MetricService                   *MetricService
	PlanService                     *PlanService
	PlanJobTagService               *PlanLabelService
	ProblemService                  *ProblemService
	UserService                     *UserService
	WayService                      *WayService
	WayStatisticsService            *WayStatisticsService
	WayTagService                   *WayTagService
	ToUserMentoringRequestService   *ToUserMentoringRequestService
	UserTagService                  *UserTagService
	WayCollectionService            *WayCollectionService
	WayCollectionWayService         *WayCollectionWayService
}

func NewService(pool *pgxpool.Pool, geminiClient *genai.Client, config *config.Config) *Service {
	queries := db.New(pool)
	googleOAuthConfig := auth.MakeGoogleOAuthConfig(config)

	return &Service{
		AuthService:                     newAuthService(googleOAuthConfig, []byte(config.SecretSessionKey)),
		CommentService:                  NewCommentService(queries),
		CompositeWayService:             NewCompositeWayService(queries),
		DayReportService:                NewDayReportService(queries),
		DevService:                      NewDevService(queries, pool),
		FavoriteUserService:             NewFavoriteUserService(queries),
		FavoriteUserWayService:          NewFavoriteUserWayService(queries),
		FromUserMentoringRequestService: NewFromUserMentoringRequestService(queries),
		GeminiService:                   NewGeminiService(geminiClient, config),
		PermissionService:               NewPermissionService(queries),
		JobDoneService:                  NewJobDoneService(queries),
		JobDoneLabelService:             NewJobDoneLabelService(queries),
		JobTagService:                   NewLabelService(queries),
		LimitService:                    NewLimitService(queries),
		MentorUserWayService:            NewMentorUserWayService(queries),
		MetricService:                   NewMetricService(queries),
		PlanService:                     NewPlanService(queries),
		PlanJobTagService:               NewPlanLabelService(queries),
		ProblemService:                  NewProblemService(queries),
		UserService:                     NewUserService(queries),
		WayService:                      NewWayService(queries),
		WayStatisticsService:            NewWayStatisticsService(queries),
		WayTagService:                   NewWayTagService(queries),
		ToUserMentoringRequestService:   NewToUserMentoringRequestService(queries),
		UserTagService:                  NewUserTagService(queries),
		WayCollectionService:            NewWayCollectionService(queries),
		WayCollectionWayService:         NewWayCollectionWayService(queries),
	}
}
