package services

import (
	"context"
	"mwnotification/internal/schemas"

	"errors"

	"github.com/google/uuid"
	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"

	db "mwnotification/internal/db/sqlc"
)

var ErrPrivateRoomAlreadyExists = errors.New("A private room for these users already exists")

type NotificationRepository interface {
	// GetNotificationListByUserId(ctx context.Context, userUUID pgtype.UUID) (int64, error)
	WithTx(tx pgx.Tx) *db.Queries
}

type NotificationService struct {
	pool                   *pgxpool.Pool
	notificationRepository NotificationRepository
}

func NewNotificationService(pool *pgxpool.Pool, notificationRepository NotificationRepository) *NotificationService {
	return &NotificationService{pool, notificationRepository}
}

func (roomsService *NotificationService) GetNotificationListByUserId(ctx context.Context, userUUID uuid.UUID) (*schemas.GetChatPreviewResponse, error) {
	// userPgUUID := pgtype.UUID{Bytes: userUUID, Valid: true}

	// chatPreview, err := roomsService.notificationRepository.GetNotificationListByUserId(ctx, userPgUUID)
	// if err != nil {
	// 	return nil, err
	// }

	return &schemas.GetChatPreviewResponse{
		// UnreadMessagesAmount: int(chatPreview),
	}, nil
}
