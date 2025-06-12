package services

import (
	"context"
	db "mw-training/internal/db/sqlc"

	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"
)

// HERE
type TrainingTestRepository interface {
	CreateTrainingsTests(ctx context.Context, params db.CreateTrainingsTestsParams) (db.TrainingsTest, error)
	WithTx(tx pgx.Tx) *db.Queries
}

type TrainingTestService struct {
	trainingTestRepository TrainingTestRepository
	pgxPool                *pgxpool.Pool
}

func NewTrainingTestService(pgxPool *pgxpool.Pool, trainingTestRepository TrainingTestRepository) *TrainingTestService {
	return &TrainingTestService{
		pgxPool:                pgxPool,
		trainingTestRepository: trainingTestRepository,
	}
}

func (ts *TrainingTestService) CreateTrainingTest(ctx context.Context, params *db.CreateTrainingsTestsParams) error {
	_, err := ts.trainingTestRepository.CreateTrainingsTests(ctx, *params)
	if err != nil {
		return err
	}

	return err
}
