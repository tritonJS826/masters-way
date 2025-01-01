package services

import (
	"context"
	db "mw-training/internal/db/sqlc"

	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"
)

type TrainingStudentRepository interface {
	CreateTrainingStudent(ctx context.Context, arg db.CreateTrainingStudentParams) (db.TrainingsStudent, error)
	DeleteTrainingStudentByIds(ctx context.Context, arg db.DeleteTrainingStudentByIdsParams) error
	WithTx(tx pgx.Tx) *db.Queries
}

type TrainingStudentService struct {
	trainingStudentRepository TrainingStudentRepository
	pgxPool                   *pgxpool.Pool
}

func NewTrainingStudentService(pgxPool *pgxpool.Pool, trainingStudentRepository TrainingStudentRepository) *TrainingStudentService {
	return &TrainingStudentService{
		pgxPool:                   pgxPool,
		trainingStudentRepository: trainingStudentRepository,
	}
}

func (fts *TrainingStudentService) CreateTrainingStudent(ctx context.Context, arg db.CreateTrainingStudentParams) (db.TrainingsStudent, error) {
	return fts.trainingStudentRepository.CreateTrainingStudent(ctx, arg)
}

func (fts *TrainingStudentService) DeleteTrainingStudentByIds(ctx context.Context, arg db.DeleteTrainingStudentByIdsParams) error {
	return fts.trainingStudentRepository.DeleteTrainingStudentByIds(ctx, arg)
}
