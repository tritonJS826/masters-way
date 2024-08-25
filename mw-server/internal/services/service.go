package services

import (
	db "mwserver/db/sqlc"

	"github.com/google/generative-ai-go/genai"
	"github.com/jackc/pgx/v5/pgxpool"
)

type Service struct {
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
	JobDoneJobTagService            *JobDoneJobTagService
	JobTagService                   *JobTagService
	LimitService                    *LimitService
	MentorUserWayService            *MentorUserWayService
	MetricService                   *MetricService
	PlanService                     *PlanService
	PlanJobTagService               *PlanJobTagService
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

func NewService(pool *pgxpool.Pool, geminiClient *genai.Client) *Service {
	queries := db.New(pool)

	return &Service{
		CommentService:                  NewCommentService(queries),
		CompositeWayService:             NewCompositeWayService(queries),
		DayReportService:                NewDayReportService(queries),
		DevService:                      NewDevService(queries, pool),
		FavoriteUserService:             NewFavoriteUserService(queries),
		FavoriteUserWayService:          NewFavoriteUserWayService(queries),
		FromUserMentoringRequestService: NewFromUserMentoringRequestService(queries),
		GeminiService:                   NewGeminiService(geminiClient),
		PermissionService:               NewPermissionService(queries),
		JobDoneService:                  NewJobDoneService(queries),
		JobDoneJobTagService:            NewJobDoneJobTagService(queries),
		JobTagService:                   NewJobTagService(queries),
		LimitService:                    NewLimitService(queries),
		MentorUserWayService:            NewMentorUserWayService(queries),
		MetricService:                   NewMetricService(queries),
		PlanService:                     NewPlanService(queries),
		PlanJobTagService:               NewPlanJobTagService(queries),
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
