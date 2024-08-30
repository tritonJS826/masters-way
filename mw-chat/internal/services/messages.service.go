package services

import (
	"context"

	db "mwchat/internal/db/sqlc"
	"mwchat/internal/schemas"
	"mwchat/pkg/utils"

	"github.com/google/uuid"
	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgtype"
	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/samber/lo"
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

func (messagesService *MessagesService) CreateMessage(ctx context.Context, messageParams *CreateMessageParams) (*schemas.CreateMessageResponse, error) {
	tx, err := messagesService.pool.Begin(ctx)
	if err != nil {
		return nil, err
	}
	defer tx.Rollback(ctx)

	qtx := messagesService.MessagesRepository.WithTx(tx)

	roomPgUUID := pgtype.UUID{Bytes: uuid.MustParse(messageParams.RoomUUID), Valid: true}

	createMessageParams := db.CreateMessageParams{
		OwnerUuid: pgtype.UUID{Bytes: uuid.MustParse(messageParams.OwnerUUID), Valid: true},
		RoomUuid:  roomPgUUID,
		Text:      messageParams.Text,
	}

	message, err := qtx.CreateMessage(ctx, createMessageParams)
	if err != nil {
		return nil, err
	}

	messageStatusParams := db.CreateMessageStatusParams{
		RoomUuid:    roomPgUUID,
		MessageUuid: message.Uuid,
		UserUuid:    message.OwnerUuid,
	}
	err = qtx.CreateMessageStatus(ctx, messageStatusParams)
	if err != nil {
		return nil, err
	}

	userUUIDs, err := qtx.GetUsersUUIDsInRoom(ctx, roomPgUUID)
	if err != nil {
		return nil, err
	}

	users := lo.Map(userUUIDs, func(user pgtype.UUID, i int) string {
		return utils.ConvertPgUUIDToUUID(user).String()
	})

	tx.Commit(ctx)

	return &schemas.CreateMessageResponse{
		Users: users,
		Message: schemas.MessageResponse{
			MessageID: utils.ConvertPgUUIDToUUID(message.Uuid).String(),
			OwnerID:   utils.ConvertPgUUIDToUUID(message.OwnerUuid).String(),
			Message:   message.Text,
			Readers:   []schemas.MessageReader{},
		},
	}, nil
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
