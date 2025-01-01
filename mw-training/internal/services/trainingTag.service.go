package services

import (
	"context"
	db "mw-training/internal/db/sqlc"

	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"
)

type TrainingTrainingTagRepository interface {
	CreateTrainingTrainingTag(ctx context.Context, params db.CreateTrainingTrainingTagParams) (db.TrainingsTrainingTag, error)
	DeleteTrainingsTrainingTag(ctx context.Context, arg db.DeleteTrainingsTrainingTagParams) error
	WithTx(tx pgx.Tx) *db.Queries
}

type TrainingTrainingTagService struct {
	trainingTrainingTagRepository TrainingTrainingTagRepository
	pgxPool                       *pgxpool.Pool
}

func NewTrainingTrainingTagService(pgxPool *pgxpool.Pool, trainingTrainingTagRepository TrainingTrainingTagRepository) *TrainingTrainingTagService {
	return &TrainingTrainingTagService{
		pgxPool:                       pgxPool,
		trainingTrainingTagRepository: trainingTrainingTagRepository,
	}
}

func (ts *TrainingTrainingTagService) CreateTrainingTrainingTag(ctx context.Context, params db.CreateTrainingTrainingTagParams) (db.TrainingsTrainingTag, error) {
	// TODO: add logic create tag if tag with such name does not exist
	return ts.trainingTrainingTagRepository.CreateTrainingTrainingTag(ctx, params)
}

func (ts *TrainingTrainingTagService) DeleteTrainingTrainingTag(ctx context.Context, params db.DeleteTrainingsTrainingTagParams) error {
	return ts.trainingTrainingTagRepository.DeleteTrainingsTrainingTag(ctx, params)
}
