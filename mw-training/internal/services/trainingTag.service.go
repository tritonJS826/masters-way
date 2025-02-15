package services

import (
	"context"
	db "mw-training/internal/db/sqlc"

	"github.com/google/uuid"
	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgtype"
	"github.com/jackc/pgx/v5/pgxpool"
)

type TrainingTrainingTagRepository interface {
	CreateTrainingTrainingTag(ctx context.Context, params db.CreateTrainingTrainingTagParams) (db.TrainingsTrainingTag, error)
	CreateTrainingTag(ctx context.Context, tagName string) (db.TrainingTag, error)
	GetTrainingTagByName(ctx context.Context, tagName string) (db.TrainingTag, error)
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

type CreateTrainingTrainingTagParams struct {
	TrainingTagName string
	TrainingUuid    string
}

func (ts *TrainingTrainingTagService) CreateTrainingTrainingTag(ctx context.Context, params CreateTrainingTrainingTagParams) (string, error) {
	tag, isExistErr := ts.trainingTrainingTagRepository.GetTrainingTagByName(ctx, params.TrainingTagName)

	var args db.CreateTrainingTrainingTagParams
	var tagName string
	// tag already exist
	if isExistErr == nil {
		args = db.CreateTrainingTrainingTagParams{
			TrainingUuid: pgtype.UUID{Bytes: uuid.MustParse(params.TrainingUuid), Valid: true},
			TagUuid:      tag.Uuid,
		}
		tagName = tag.Name
		// tag not exist yet
	} else {
		newTag, err := ts.trainingTrainingTagRepository.CreateTrainingTag(ctx, params.TrainingTagName)
		if err != nil {
			return "", err
		}
		args = db.CreateTrainingTrainingTagParams{
			TrainingUuid: pgtype.UUID{Bytes: uuid.MustParse(params.TrainingUuid), Valid: true},
			TagUuid:      newTag.Uuid,
		}
		tagName = newTag.Name

	}

	_, err := ts.trainingTrainingTagRepository.CreateTrainingTrainingTag(ctx, args)
	if err != nil {
		return "", err
	}

	return tagName, nil

}

func (ts *TrainingTrainingTagService) DeleteTrainingTrainingTag(ctx context.Context, params db.DeleteTrainingsTrainingTagParams) error {
	return ts.trainingTrainingTagRepository.DeleteTrainingsTrainingTag(ctx, params)
}
