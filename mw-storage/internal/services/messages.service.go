package services

import (
	"context"

	db "mwstorage/internal/db/sqlc"

	"github.com/google/uuid"
	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgtype"
	"github.com/jackc/pgx/v5/pgxpool"
)

type IMessagesRepository interface {
	CreateMessage(ctx context.Context, arg db.CreateMessageParams) (db.CreateMessageRow, error)
	UpdateMessageStatus(ctx context.Context, arg db.UpdateMessageStatusParams) error
	WithTx(tx pgx.Tx) *db.Queries
}

type MessagesService struct {
	pool               *pgxpool.Pool
	MessagesRepository IMessagesRepository
}

func NewMessagesService(pool *pgxpool.Pool, MessagesRepository IMessagesRepository) *MessagesService {
	return &MessagesService{pool, MessagesRepository}
}

type CreateMessageParams struct {
	OwnerUUID string
	RoomUUID  string
	Text      string
}

type UpdateMessageStatusParams struct {
	MessageUUID uuid.UUID
	UserUUID    uuid.UUID
	IsRead      bool
}

func (messagesService *MessagesService) UpdateMessageStatus(ctx context.Context, params *UpdateMessageStatusParams) error {
	updateMessageStatusParams := db.UpdateMessageStatusParams{
		IsRead:      params.IsRead,
		MessageUuid: pgtype.UUID{Bytes: params.MessageUUID, Valid: true},
		UserUuid:    pgtype.UUID{Bytes: params.UserUUID, Valid: true},
	}

	err := messagesService.MessagesRepository.UpdateMessageStatus(ctx, updateMessageStatusParams)
	if err != nil {
		return err
	}

	return nil
}
