package services

import (
	db "mw-training/internal/db/sqlc"

	"github.com/jackc/pgx/v5/pgxpool"
)

type Service struct {
	DevService                  *DevService
	FavoriteTrainingUserService *FavoriteTrainingUserService
	PracticeMaterialService     *PracticeMaterialService
	TheoryMaterialService       *TheoryMaterialService
	TrainingMentorService       *TrainingMentorService
	TrainingMessageToAiService  *TrainingMessageToAiService
	TrainingStudentService      *TrainingStudentService
	TopicService                *TopicService
	TrainingService             *TrainingService
	TrainingTrainingTagService  *TrainingTrainingTagService
	TestService                 *TestService
	TrainingTestService         *TrainingTestService
	SessionService              *SessionService
	TestSessionResultService    *TestSessionResultService
	QuestionService             *QuestionService
	QuestionResultService       *QuestionResultService
}

func NewService(pool *pgxpool.Pool) *Service {
	queries := db.New(pool)
	return &Service{
		DevService:                  NewDevService(pool, queries),
		FavoriteTrainingUserService: NewFavoriteTrainingUserService(pool, queries),
		PracticeMaterialService:     NewPracticeMaterialService(pool, queries),
		TheoryMaterialService:       NewTheoryMaterialService(pool, queries),
		TrainingMentorService:       NewTrainingMentorService(pool, queries),
		TrainingMessageToAiService:  NewTrainingMessageToAiService(pool, queries),
		TrainingStudentService:      NewTrainingStudentService(pool, queries),
		TopicService:                NewTopicService(pool, queries),
		TrainingService:             NewTrainingService(pool, queries),
		TrainingTrainingTagService:  NewTrainingTrainingTagService(pool, queries),
		TestService:                 NewTestService(pool, queries),
		TrainingTestService:         NewTrainingTestService(pool, queries),
		SessionService:              NewSessionService(pool, queries),
		TestSessionResultService:    NewTestSessionResultService(pool, queries),
		QuestionService:             NewQuestionService(pool, queries),
		QuestionResultService:       NewQuestionResultService(pool, queries),
	}
}
