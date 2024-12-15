package services

import (
	"context"

	db "mw-training/internal/db/sqlc"
	"mw-training/internal/schemas"

	"github.com/google/uuid"
	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"
)

type IMessagesRepository interface {
	// CreateMessage(ctx context.Context, arg db.CreateMessageParams) (db.CreateMessageRow, error)
	// CreateMessageStatus(ctx context.Context, arg db.CreateMessageStatusParams) error
	// GetUsersUUIDsInRoom(ctx context.Context, roomUuid pgtype.UUID) ([]pgtype.UUID, error)
	// UpdateMessageStatus(ctx context.Context, arg db.UpdateMessageStatusParams) error
	// SetAllRoomMessagesAsRead(ctx context.Context, arg db.SetAllRoomMessagesAsReadParams) error
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
	return &schemas.CreateMessageResponse{}, nil
}

type UpdateMessageStatusParams struct {
	MessageUUID uuid.UUID
	UserUUID    uuid.UUID
	IsRead      bool
}

func (messagesService *MessagesService) UpdateMessageStatus(ctx context.Context, params *UpdateMessageStatusParams) error {
	return nil
}

func (messagesService *MessagesService) SetAllRoomMessagesAsRead(ctx context.Context, userUUID, roomUUID uuid.UUID) error {
	return nil
}
