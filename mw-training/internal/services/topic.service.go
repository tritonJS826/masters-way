package services

import (
	"context"
	db "mw-training/internal/db/sqlc"

	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgtype"
	"github.com/jackc/pgx/v5/pgxpool"
)

type TopicRepository interface {
	CreateTopicInTraining(ctx context.Context, params db.CreateTopicInTrainingParams) (db.Topic, error)
	UpdateTopic(ctx context.Context, params db.UpdateTopicParams) (db.Topic, error)
	DeleteTopic(ctx context.Context, topicUuid pgtype.UUID) (db.Topic, error)
	WithTx(tx pgx.Tx) *db.Queries
}

type TopicService struct {
	topicRepository TopicRepository
	pgxPool         *pgxpool.Pool
}

func NewTopicService(pgxPool *pgxpool.Pool, topicRepository TopicRepository) *TopicService {
	return &TopicService{
		pgxPool:         pgxPool,
		topicRepository: topicRepository,
	}
}

func (ts *TopicService) CreateTopic(ctx context.Context, params db.CreateTopicInTrainingParams) (db.Topic, error) {
	return ts.topicRepository.CreateTopicInTraining(ctx, params)
}

func (ts *TopicService) UpdateTopic(ctx context.Context, params db.UpdateTopicParams) (db.Topic, error) {
	return ts.topicRepository.UpdateTopic(ctx, params)
}

func (ts *TopicService) DeleteTopic(ctx context.Context, topicUuid pgtype.UUID) (db.Topic, error) {
	return ts.topicRepository.DeleteTopic(ctx, topicUuid)
}
