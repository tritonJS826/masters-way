package services

import (
	"context"
	db "mw-training/internal/db/sqlc"

	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"
)

type TrainingMentorRepository interface {
	CreateTrainingMentor(ctx context.Context, arg db.CreateTrainingMentorParams) (db.TrainingsMentor, error)
	DeleteTrainingMentorByIds(ctx context.Context, arg db.DeleteTrainingMentorByIdsParams) error
	WithTx(tx pgx.Tx) *db.Queries
}

type TrainingMentorService struct {
	trainingMentorRepository TrainingMentorRepository
	pgxPool                  *pgxpool.Pool
}

func NewTrainingMentorService(pgxPool *pgxpool.Pool, trainingMentorRepository TrainingMentorRepository) *TrainingMentorService {
	return &TrainingMentorService{
		pgxPool:                  pgxPool,
		trainingMentorRepository: trainingMentorRepository,
	}
}

// Create a new mentor for a training
func (fts *TrainingMentorService) CreateTrainingMentor(ctx context.Context, arg db.CreateTrainingMentorParams) (db.TrainingsMentor, error) {
	return fts.trainingMentorRepository.CreateTrainingMentor(ctx, arg)
}

// Delete a mentor from training
func (fts *TrainingMentorService) DeleteTrainingMentorByIds(ctx context.Context, arg db.DeleteTrainingMentorByIdsParams) error {
	return fts.trainingMentorRepository.DeleteTrainingMentorByIds(ctx, arg)
}
