package services

import (
	"mw-server/internal/auth"
	"mw-server/internal/config"
	db "mw-server/internal/db/sqlc"

	"github.com/google/generative-ai-go/genai"
	"github.com/jackc/pgx/v5/pgxpool"
)

type Service struct {
	AuthService                     *AuthService
	CommentService                  *CommentService
	CompositeWayService             *CompositeWayService
	CompanionFeedbackService        *CompanionFeedbackService
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
	ProjectService                  *ProjectService
	ProfileSettingService           *ProfileSettingService
	TelegramService                 *TelegramService
	UserService                     *UserService
	UserContactService              *UserContactService
	WayService                      *WayService
	WayStatisticsService            *WayStatisticsService
	WayTagService                   *WayTagService
	ToUserMentoringRequestService   *ToUserMentoringRequestService
	UserTagService                  *UserTagService
	UserProjectService              *UserProjectService
	WayCollectionService            *WayCollectionService
	WayCollectionWayService         *WayCollectionWayService
	SmtpService                     *SmtpService
	MailService                     *MailService
	NotificationService             *NotificationService
	NotificationSettingService      *NotificationSettingService
	GoogleDriveService              *GoogleDriveService
	FileService                     *FileService
	SurveyService                   *SurveyService
	RoomsService                    *RoomsService
	MessagesService                 *MessagesService
	TrainingService                 *TrainingService
	TopicService                    *TopicService
	TheoryMaterialService           *TheoryMaterialService
	PracticeMaterialService         *PracticeMaterialService
	TestService                     *TestService
	QuestionService                 *QuestionService
	QuestionResultService           *QuestionResultService
	SessionService                  *SessionService
	TestSessionResultService        *TestSessionResultService
	TrainingMentorService           *TrainingMentorService
	TrainingStudentService          *TrainingStudentService
	TrainingTagService              *TrainingTrainingTagService
	TrainingTestService             *TrainingTestService
	FavoriteUserTrainingService     *FavoriteTrainingUserService
	TrainingMessageToAiService      *TrainingMessageToAiService
}

func NewService(pool *pgxpool.Pool, geminiClient *genai.Client, config *config.Config) *Service {
	queries := db.New(pool)
	googleOAuthConfig := auth.MakeGoogleOAuthConfig(config)

	return &Service{
		AuthService:                     newAuthService(googleOAuthConfig, []byte(config.SecretSessionKey)),
		CommentService:                  NewCommentService(queries),
		CompositeWayService:             NewCompositeWayService(queries),
		CompanionFeedbackService:        NewCompanionFeedbackService(queries),
		DayReportService:                NewDayReportService(queries),
		DevService:                      NewDevService(queries, pool),
		FavoriteUserService:             NewFavoriteUserService(queries),
		FavoriteUserWayService:          NewFavoriteUserWayService(queries),
		FromUserMentoringRequestService: NewFromUserMentoringRequestService(queries),
		GeminiService:                   NewGeminiService(geminiClient, config),
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
		ProjectService:                  NewProjectService(pool, queries),
		ProfileSettingService:           NewProfileSettingService(pool, queries),
		TelegramService:                 NewTelegramService(queries),
		UserService:                     NewUserService(queries),
		UserContactService:              NewUserContactService(queries),
		UserProjectService:              NewUserProjectService(queries),
		WayService:                      NewWayService(queries),
		WayStatisticsService:            NewWayStatisticsService(queries),
		WayTagService:                   NewWayTagService(queries),
		ToUserMentoringRequestService:   NewToUserMentoringRequestService(queries),
		UserTagService:                  NewUserTagService(queries),
		WayCollectionService:            NewWayCollectionService(queries),
		WayCollectionWayService:         NewWayCollectionWayService(queries),
		SmtpService:                     NewSmtpService(config),
		MailService:                     NewMailService(queries),
		NotificationService:             NewNotificationService(queries),
		NotificationSettingService:      NewNotificationSettingService(queries),
		GoogleDriveService:              NewGoogleDriveService(),
		FileService:                     NewFileService(queries),
		SurveyService:                   NewSurveyService(queries),
		RoomsService:                    NewRoomsService(pool, queries),
		MessagesService:                 NewMessagesService(pool, queries),
		TrainingService:                 NewTrainingService(pool, queries),
		TopicService:                    NewTopicService(pool, queries),
		TheoryMaterialService:           NewTheoryMaterialService(pool, queries),
		PracticeMaterialService:         NewPracticeMaterialService(pool, queries),
		TestService:                     NewTestService(pool, queries, queries),
		QuestionService:                 NewQuestionService(pool, queries),
		QuestionResultService:           NewQuestionResultService(pool, queries),
		SessionService:                  NewSessionService(pool, queries),
		TestSessionResultService:        NewTestSessionResultService(pool, queries),
		TrainingMentorService:           NewTrainingMentorService(pool, queries),
		TrainingStudentService:          NewTrainingStudentService(pool, queries),
		TrainingTagService:              NewTrainingTrainingTagService(pool, queries),
		TrainingTestService:             NewTrainingTestService(pool, queries),
		FavoriteUserTrainingService:     NewFavoriteTrainingUserService(pool, queries),
		TrainingMessageToAiService:      NewTrainingMessageToAiService(pool, queries),
	}
}
