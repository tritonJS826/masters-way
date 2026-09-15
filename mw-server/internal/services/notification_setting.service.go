package services

import (
	"context"

	db "mw-server/internal/db/sqlc"
	"mw-server/internal/schemas"
	"mw-server/pkg/util"

	"github.com/google/uuid"
	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgtype"
	"github.com/samber/lo"
)

type INotificationSettingRepository interface {
	CreateNotificationSettings(ctx context.Context, userUuid pgtype.UUID) error
	GetNotificationSettingListByUserID(ctx context.Context, userUuid pgtype.UUID) ([]db.NotificationSetting, error)
	UpdateNotificationSetting(ctx context.Context, arg db.UpdateNotificationSettingParams) (db.NotificationSetting, error)
	WithTx(tx pgx.Tx) *db.Queries
}

type NotificationSettingService struct {
	repo INotificationSettingRepository
}

func NewNotificationSettingService(repo INotificationSettingRepository) *NotificationSettingService {
	return &NotificationSettingService{repo}
}

func (ns *NotificationSettingService) CreateNotificationSettings(ctx context.Context, userUUID string) error {
	uid, err := uuid.Parse(userUUID)
	if err != nil {
		return err
	}
	return ns.repo.CreateNotificationSettings(ctx, pgtype.UUID{Bytes: uid, Valid: true})
}

func (ns *NotificationSettingService) GetNotificationSettingList(ctx context.Context, userUUID string) (*schemas.GetNotificationSettingListResponse, error) {
	uid, err := uuid.Parse(userUUID)
	if err != nil {
		return nil, err
	}
	pgUserUUID := pgtype.UUID{Bytes: uid, Valid: true}

	settings, err := ns.repo.GetNotificationSettingListByUserID(ctx, pgUserUUID)
	if err != nil {
		return nil, err
	}

	items := lo.Map(settings, func(s db.NotificationSetting, _ int) schemas.NotificationSettingResponse {
		return schemas.NotificationSettingResponse{
			UUID:      util.ConvertPgUUIDToUUID(s.Uuid).String(),
			UserUUID:  util.ConvertPgUUIDToUUID(s.UserUuid).String(),
			Nature:    string(s.Nature),
			Channel:   string(s.Channel),
			IsEnabled: s.IsEnabled,
		}
	})

	return &schemas.GetNotificationSettingListResponse{NotificationSettings: items}, nil
}

func (ns *NotificationSettingService) UpdateNotificationSetting(ctx context.Context, settingUUID string, isEnabled bool) (*schemas.NotificationSettingResponse, error) {
	uid, err := uuid.Parse(settingUUID)
	if err != nil {
		return nil, err
	}

	result, err := ns.repo.UpdateNotificationSetting(ctx, db.UpdateNotificationSettingParams{
		NotificationSettingUuid: pgtype.UUID{Bytes: uid, Valid: true},
		IsEnabled:               pgtype.Bool{Bool: isEnabled, Valid: true},
	})

	return &schemas.NotificationSettingResponse{
		UUID:      util.ConvertPgUUIDToUUID(result.Uuid).String(),
		UserUUID:  util.ConvertPgUUIDToUUID(result.UserUuid).String(),
		Nature:    string(result.Nature),
		Channel:   string(result.Channel),
		IsEnabled: result.IsEnabled,
	}, nil
}