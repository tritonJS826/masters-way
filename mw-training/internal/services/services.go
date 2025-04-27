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
	}
}
