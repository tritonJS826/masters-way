package services

import (
	"context"
	db "mwnotification/internal/db/sqlc"

	"github.com/google/uuid"
	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgtype"
)

type EnabledNotificationRepository interface {
	CreateEnabledNotification(ctx context.Context, userUuid pgtype.UUID) error
	GetEnabledNotificationListByUserID(ctx context.Context, userUuid pgtype.UUID) ([]db.EnabledNotification, error)
	UpdateEnabledNotification(ctx context.Context, arg db.UpdateEnabledNotificationParams) (db.EnabledNotification, error)
	WithTx(tx pgx.Tx) *db.Queries
}

type EnabledNotificationService struct {
	enabledEnabledNotificationRepository EnabledNotificationRepository
}

func NewEnabledNotificationService(EnabledNotificationRepository EnabledNotificationRepository) *EnabledNotificationService {
	return &EnabledNotificationService{EnabledNotificationRepository}
}

func (es *EnabledNotificationService) CreateEnabledNotification(ctx context.Context, userID string) error {
	err := es.enabledEnabledNotificationRepository.CreateEnabledNotification(ctx, pgtype.UUID{Bytes: uuid.MustParse(userID), Valid: true})
	if err != nil {
		return err
	}

	return nil
}

// type UpdateEnabledNotificationParams struct {
// 	EnabledNotificationID string
// 	IsRead                bool
// }

// func (ns *EnabledNotificationService) UpdateEnabledNotification(ctx context.Context, params *UpdateEnabledNotificationParams) (*schemas.EnabledNotificationResponse, error) {
// 	arg := db.UpdateEnabledNotificationParams{
// 		IsRead:                  pgtype.Bool{Bool: params.IsRead},
// 		EnabledNotificationUuid: pgtype.UUID{Bytes: uuid.MustParse(params.EnabledNotificationID), Valid: true},
// 	}
// 	EnabledNotification, err := ns.EnabledNotificationRepository.UpdateEnabledNotification(ctx, arg)
// 	if err != nil {
// 		return nil, err
// 	}

// 	return &schemas.EnabledNotificationResponse{
// 		ID:          utils.ConvertPgUUIDToUUID(EnabledNotification.Uuid).String(),
// 		UserID:      utils.ConvertPgUUIDToUUID(EnabledNotification.UserUuid).String(),
// 		IsRead:      EnabledNotification.IsRead,
// 		Description: EnabledNotification.Description.String,
// 		Url:         EnabledNotification.Url.String,
// 		Nature:      string(EnabledNotification.Nature),
// 		CreatedAt:   EnabledNotification.CreatedAt.Time.Format(utils.DEFAULT_STRING_LAYOUT),
// 	}, nil
// }

// func (ns *EnabledNotificationService) GetEnabledNotificationListByUserId(ctx context.Context, userID string) (*schemas.GetChatPreviewResponse, error) {
// 	userPgUUID := pgtype.UUID{Bytes: uuid.MustParse(userID), Valid: true}

// 	EnabledNotifications, err := ns.EnabledNotificationRepository.GetEnabledNotificationListByUserId(ctx, userPgUUID)
// 	if err != nil {
// 		return nil, err
// 	}

// 	return &schemas.GetChatPreviewResponse{
// 		// UnreadMessagesAmount: int(chatPreview),
// 	}, nil
// }
