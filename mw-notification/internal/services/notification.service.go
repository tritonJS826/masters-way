package services

import (
	"context"
	"mwnotification/internal/schemas"
	"mwnotification/pkg/utils"

	"errors"

	"github.com/google/uuid"
	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgtype"
	"github.com/samber/lo"

	db "mwnotification/internal/db/sqlc"
)

var ErrPrivateRoomAlreadyExists = errors.New("A private room for these users already exists")

type NotificationRepository interface {
	CreateNotification(ctx context.Context, arg db.CreateNotificationParams) (db.Notification, error)
	UpdateNotification(ctx context.Context, arg db.UpdateNotificationParams) (db.Notification, error)
	GetNotificationListByUserID(ctx context.Context, userUuid pgtype.UUID) ([]db.Notification, error)
	WithTx(tx pgx.Tx) *db.Queries
}

type NotificationService struct {
	notificationRepository NotificationRepository
}

func NewNotificationService(notificationRepository NotificationRepository) *NotificationService {
	return &NotificationService{notificationRepository}
}

func (ns *NotificationService) CreateNotification(ctx context.Context, payload *schemas.CreateNotificationPayload) (*schemas.NotificationResponse, error) {
	arg := db.CreateNotificationParams{
		UserUuid:    pgtype.UUID{Bytes: uuid.MustParse(payload.UserID), Valid: true},
		Description: pgtype.Text{String: payload.Description, Valid: true},
		Url:         pgtype.Text{String: payload.Url, Valid: true},
		Nature:      db.NotificationNature(payload.Nature),
	}

	notification, err := ns.notificationRepository.CreateNotification(ctx, arg)
	if err != nil {
		return nil, err
	}

	return &schemas.NotificationResponse{
		ID:          utils.ConvertPgUUIDToUUID(notification.Uuid).String(),
		UserID:      utils.ConvertPgUUIDToUUID(notification.UserUuid).String(),
		IsRead:      notification.IsRead,
		Description: notification.Description.String,
		Url:         notification.Url.String,
		Nature:      string(notification.Nature),
		CreatedAt:   notification.CreatedAt.Time.Format(utils.DEFAULT_STRING_LAYOUT),
	}, nil
}

type UpdateNotificationParams struct {
	NotificationID string
	IsRead         bool
}

func (ns *NotificationService) UpdateNotification(ctx context.Context, params *UpdateNotificationParams) (*schemas.NotificationResponse, error) {
	arg := db.UpdateNotificationParams{
		IsRead:           pgtype.Bool{Bool: params.IsRead},
		NotificationUuid: pgtype.UUID{Bytes: uuid.MustParse(params.NotificationID), Valid: true},
	}
	notification, err := ns.notificationRepository.UpdateNotification(ctx, arg)
	if err != nil {
		return nil, err
	}

	return &schemas.NotificationResponse{
		ID:          utils.ConvertPgUUIDToUUID(notification.Uuid).String(),
		UserID:      utils.ConvertPgUUIDToUUID(notification.UserUuid).String(),
		IsRead:      notification.IsRead,
		Description: notification.Description.String,
		Url:         notification.Url.String,
		Nature:      string(notification.Nature),
		CreatedAt:   notification.CreatedAt.Time.Format(utils.DEFAULT_STRING_LAYOUT),
	}, nil
}

func (ns *NotificationService) GetNotificationListByUserID(ctx context.Context, userID string) (*schemas.GetNotificationListResponse, error) {
	userPgUUID := pgtype.UUID{Bytes: uuid.MustParse(userID), Valid: true}

	notificationListRaw, err := ns.notificationRepository.GetNotificationListByUserID(ctx, userPgUUID)
	if err != nil {
		return nil, err
	}

	notificationList := lo.Map(notificationListRaw, func(notificationRaw db.Notification, _ int) schemas.NotificationResponse {
		return schemas.NotificationResponse{
			ID:          utils.ConvertPgUUIDToUUID(notificationRaw.Uuid).String(),
			UserID:      utils.ConvertPgUUIDToUUID(notificationRaw.UserUuid).String(),
			IsRead:      notificationRaw.IsRead,
			Description: notificationRaw.Description.String,
			Url:         notificationRaw.Url.String,
			Nature:      string(notificationRaw.Nature),
			CreatedAt:   notificationRaw.CreatedAt.Time.Format(utils.DEFAULT_STRING_LAYOUT),
		}
	})

	return &schemas.GetNotificationListResponse{
		Size:          len(notificationList),
		Notifications: notificationList,
	}, nil
}
