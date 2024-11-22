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

type NotificationSettingRepository interface {
	CreateNotificationSettings(ctx context.Context, userUuid pgtype.UUID) error
	GetNotificationSettingListByUserID(ctx context.Context, userUuid pgtype.UUID) ([]db.NotificationSetting, error)
	GetEnabledNotificationSettingListByUserID(ctx context.Context, userUuid pgtype.UUID) ([]db.NotificationSetting, error)
	UpdateNotificationSetting(ctx context.Context, arg db.UpdateNotificationSettingParams) (db.NotificationSetting, error)
	WithTx(tx pgx.Tx) *db.Queries
}

type NotificationSettingService struct {
	notificationSettingRepository NotificationSettingRepository
}

func NewNotificationSettingService(notificationSettingRepository NotificationSettingRepository) *NotificationSettingService {
	return &NotificationSettingService{notificationSettingRepository}
}

func (es *NotificationSettingService) CreateNotificationSettings(ctx context.Context, userID uuid.UUID) error {
	err := es.notificationSettingRepository.CreateNotificationSettings(ctx, pgtype.UUID{Bytes: userID, Valid: true})
	if err != nil {
		return err
	}
	return nil
}

type UpdateNotificationSettingParams struct {
	NotificationSettingUUID uuid.UUID
	IsEnabled               bool
}

func (es *NotificationSettingService) UpdateNotificationSetting(ctx context.Context, params *UpdateNotificationSettingParams) (*schemas.NotificationSettingResponse, error) {
	arg := db.UpdateNotificationSettingParams{
		IsEnabled:               pgtype.Bool{Bool: params.IsEnabled, Valid: true},
		NotificationSettingUuid: pgtype.UUID{Bytes: params.NotificationSettingUUID, Valid: true},
	}
	notificationSetting, err := es.notificationSettingRepository.UpdateNotificationSetting(ctx, arg)
	if err != nil {
		return nil, err
	}

	return &schemas.NotificationSettingResponse{
		UUID:      utils.ConvertPgUUIDToUUID(notificationSetting.Uuid).String(),
		UserUUID:  utils.ConvertPgUUIDToUUID(notificationSetting.UserUuid).String(),
		Nature:    string(notificationSetting.Nature),
		Channel:   string(notificationSetting.Channel),
		IsEnabled: notificationSetting.IsEnabled,
	}, nil
}

func (es *NotificationSettingService) GetNotificationSettingListByUserID(ctx context.Context, userUUID uuid.UUID) (*schemas.GetNotificationSettingListResponse, error) {
	userPgUUID := pgtype.UUID{Bytes: userUUID, Valid: true}

	notificationSettingsRaw, err := es.notificationSettingRepository.GetNotificationSettingListByUserID(ctx, userPgUUID)
	if err != nil {
		return nil, err
	}

	notificationSettings := lo.Map(notificationSettingsRaw, func(notificationSettingRaw db.NotificationSetting, _ int) schemas.NotificationSettingResponse {
		return schemas.NotificationSettingResponse{
			UUID:      utils.ConvertPgUUIDToUUID(notificationSettingRaw.Uuid).String(),
			UserUUID:  utils.ConvertPgUUIDToUUID(notificationSettingRaw.UserUuid).String(),
			Nature:    string(notificationSettingRaw.Nature),
			Channel:   string(notificationSettingRaw.Channel),
			IsEnabled: notificationSettingRaw.IsEnabled,
		}
	})

	return &schemas.GetNotificationSettingListResponse{
		NotificationSettings: notificationSettings,
	}, nil
}

func (es *NotificationSettingService) GetEnabledNotificationSettingListByUserID(ctx context.Context, userUUID uuid.UUID) (*schemas.GetNotificationSettingListResponse, error) {
	userPgUUID := pgtype.UUID{Bytes: userUUID, Valid: true}

	notificationSettingsRaw, err := es.notificationSettingRepository.GetEnabledNotificationSettingListByUserID(ctx, userPgUUID)
	if err != nil {
		return nil, err
	}

	notificationSettings := lo.Map(notificationSettingsRaw, func(notificationSettingRaw db.NotificationSetting, _ int) schemas.NotificationSettingResponse {
		return schemas.NotificationSettingResponse{
			UUID:      utils.ConvertPgUUIDToUUID(notificationSettingRaw.Uuid).String(),
			UserUUID:  utils.ConvertPgUUIDToUUID(notificationSettingRaw.UserUuid).String(),
			Nature:    string(notificationSettingRaw.Nature),
			Channel:   string(notificationSettingRaw.Channel),
			IsEnabled: notificationSettingRaw.IsEnabled,
		}
	})

	return &schemas.GetNotificationSettingListResponse{
		NotificationSettings: notificationSettings,
	}, nil
}
