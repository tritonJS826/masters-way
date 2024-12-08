package services

import (
	"context"

	db "mw-training/internal/db/sqlc"
	"mw-training/internal/schemas"
	"mw-training/pkg/utils"

	"github.com/google/uuid"
	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgtype"
	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/samber/lo"
)

type IMessagesRepository interface {
	CreateMessage(ctx context.Context, arg db.CreateMessageParams) (db.CreateMessageRow, error)
	CreateMessageStatus(ctx context.Context, arg db.CreateMessageStatusParams) error
	GetUsersUUIDsInRoom(ctx context.Context, roomUuid pgtype.UUID) ([]pgtype.UUID, error)
	UpdateMessageStatus(ctx context.Context, arg db.UpdateMessageStatusParams) error
	SetAllRoomMessagesAsRead(ctx context.Context, arg db.SetAllRoomMessagesAsReadParams) error
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

func (ms *MessagesService) CreateMessage(ctx context.Context, messageParams *CreateMessageParams) (*schemas.CreateMessageResponse, error) {
	tx, err := ms.pool.Begin(ctx)
	if err != nil {
		return nil, err
	}
	defer tx.Rollback(ctx)

	var messagesRepositoryTx IMessagesRepository = ms.MessagesRepository.WithTx(tx)

	roomPgUUID := pgtype.UUID{Bytes: uuid.MustParse(messageParams.RoomUUID), Valid: true}

	createMessageParams := db.CreateMessageParams{
		OwnerUuid: pgtype.UUID{Bytes: uuid.MustParse(messageParams.OwnerUUID), Valid: true},
		RoomUuid:  roomPgUUID,
		Text:      messageParams.Text,
	}

	message, err := messagesRepositoryTx.CreateMessage(ctx, createMessageParams)
	if err != nil {
		return nil, err
	}

	messageStatusParams := db.CreateMessageStatusParams{
		RoomUuid:    roomPgUUID,
		MessageUuid: message.Uuid,
		UserUuid:    message.OwnerUuid,
	}
	err = messagesRepositoryTx.CreateMessageStatus(ctx, messageStatusParams)
	if err != nil {
		return nil, err
	}

	userUUIDs, err := messagesRepositoryTx.GetUsersUUIDsInRoom(ctx, roomPgUUID)
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

func (messagesService *MessagesService) SetAllRoomMessagesAsRead(ctx context.Context, userUUID, roomUUID uuid.UUID) error {
	return messagesService.MessagesRepository.SetAllRoomMessagesAsRead(ctx, db.SetAllRoomMessagesAsReadParams{
		RoomUuid: pgtype.UUID{Bytes: roomUUID, Valid: true},
		UserUuid: pgtype.UUID{Bytes: userUUID, Valid: true},
	})
}
