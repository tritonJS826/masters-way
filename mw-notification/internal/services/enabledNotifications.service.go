package services

import (
	"context"
	db "mw-notification/internal/db/sqlc"
	"mw-notification/internal/schemas"
	"mw-notification/pkg/utils"

	"github.com/google/uuid"
	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgtype"
	"github.com/samber/lo"
)

type EnabledNotificationRepository interface {
	CreateEnabledNotifications(ctx context.Context, userUuid pgtype.UUID) error
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

func (es *EnabledNotificationService) CreateEnabledNotifications(ctx context.Context, userID uuid.UUID) error {
	err := es.enabledEnabledNotificationRepository.CreateEnabledNotifications(ctx, pgtype.UUID{Bytes: userID, Valid: true})
	if err != nil {
		return err
	}

	return nil
}

type UpdateEnabledNotificationParams struct {
	EnabledNotificationUUID uuid.UUID
	IsEnabled               bool
}

func (es *EnabledNotificationService) UpdateEnabledNotification(ctx context.Context, params *UpdateEnabledNotificationParams) (*schemas.EnabledNotificationResponse, error) {
	arg := db.UpdateEnabledNotificationParams{
		IsEnabled:                pgtype.Bool{Bool: params.IsEnabled, Valid: true},
		EnabledNotificationsUuid: pgtype.UUID{Bytes: params.EnabledNotificationUUID, Valid: true},
	}
	enabledNotification, err := es.enabledEnabledNotificationRepository.UpdateEnabledNotification(ctx, arg)
	if err != nil {
		return nil, err
	}

	return &schemas.EnabledNotificationResponse{
		UUID:      utils.ConvertPgUUIDToUUID(enabledNotification.Uuid).String(),
		UserUUID:  utils.ConvertPgUUIDToUUID(enabledNotification.UserUuid).String(),
		Nature:    string(enabledNotification.Nature),
		Channel:   string(enabledNotification.Channel),
		IsEnabled: enabledNotification.IsEnabled,
	}, nil
}

func (es *EnabledNotificationService) GetEnabledNotificationListByUserID(ctx context.Context, userUUID uuid.UUID) (*schemas.GetEnabledNotificationListResponse, error) {
	userPgUUID := pgtype.UUID{Bytes: userUUID, Valid: true}

	enabledNotificationsRaw, err := es.enabledEnabledNotificationRepository.GetEnabledNotificationListByUserID(ctx, userPgUUID)
	if err != nil {
		return nil, err
	}

	enabledNotifications := lo.Map(enabledNotificationsRaw, func(enabledNotificationRaw db.EnabledNotification, _ int) schemas.EnabledNotificationResponse {
		return schemas.EnabledNotificationResponse{
			UUID:      utils.ConvertPgUUIDToUUID(enabledNotificationRaw.Uuid).String(),
			UserUUID:  utils.ConvertPgUUIDToUUID(enabledNotificationRaw.UserUuid).String(),
			Nature:    string(enabledNotificationRaw.Nature),
			Channel:   string(enabledNotificationRaw.Channel),
			IsEnabled: enabledNotificationRaw.IsEnabled,
		}
	})

	return &schemas.GetEnabledNotificationListResponse{
		EnabledNotifications: enabledNotifications,
	}, nil
}
