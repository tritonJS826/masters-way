package services

import (
	"context"
	"fmt"
	"time"

	db "mw-server/internal/db/sqlc"
	"mw-server/internal/schemas"
	"mw-server/pkg/util"

	"github.com/google/uuid"
	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgtype"
	"github.com/samber/lo"
)

const notificationDedupWindow = 10 * time.Minute

type INotificationRepository interface {
	CreateNotification(ctx context.Context, arg db.CreateNotificationParams) (db.Notification, error)
	GetLastNotification(ctx context.Context, arg db.GetLastNotificationParams) (db.Notification, error)
	GetNotificationListByUserID(ctx context.Context, arg db.GetNotificationListByUserIDParams) ([]db.Notification, error)
	GetAmountOfUnreadNotificationsByUserID(ctx context.Context, userUuid pgtype.UUID) (db.GetAmountOfUnreadNotificationsByUserIDRow, error)
	UpdateNotification(ctx context.Context, arg db.UpdateNotificationParams) (db.Notification, error)
	GetEnabledNotificationSettingListByUserID(ctx context.Context, userUuid pgtype.UUID) ([]db.NotificationSetting, error)
	WithTx(tx pgx.Tx) *db.Queries
}

type NotificationService struct {
	repo INotificationRepository
}

func NewNotificationService(repo INotificationRepository) *NotificationService {
	return &NotificationService{repo}
}

func (ns *NotificationService) CreateNotification(ctx context.Context, params *schemas.NotificationReceiver, nature string) (*db.Notification, bool, error) {
	if nature != "own_way" && nature != "mentoring_way" {
		return nil, false, fmt.Errorf("nature %s not implemented", nature)
	}

	userUUID, err := uuid.Parse(params.UserUUID)
	if err != nil {
		return nil, false, err
	}
	pgUserUUID := pgtype.UUID{Bytes: userUUID, Valid: true}

	lastNotification, err := ns.repo.GetLastNotification(ctx, db.GetLastNotificationParams{
		UserUuid: pgUserUUID,
		Nature:   db.NotificationNature(nature),
	})
	if err == nil {
		if lastNotification.CreatedAt.Valid {
			if time.Since(lastNotification.CreatedAt.Time) < notificationDedupWindow {
				descPtr := util.MarshalPgText(lastNotification.Description)
				expectedDesc := ns.getDescriptionForNature(params, nature)
				if descPtr != nil && *descPtr == expectedDesc {
					return &lastNotification, false, nil
				}
			}
		}
	}

	desc := ns.getDescriptionForNature(params, nature)
	url := ns.getURLForNature(params, nature)

	notification, err := ns.repo.CreateNotification(ctx, db.CreateNotificationParams{
		UserUuid:    pgUserUUID,
		Nature:      db.NotificationNature(nature),
		Description: pgtype.Text{String: desc, Valid: true},
		Url:         pgtype.Text{String: url, Valid: true},
	})
	if err != nil {
		return nil, false, err
	}

	return &notification, true, nil
}

func (ns *NotificationService) getDescriptionForNature(params *schemas.NotificationReceiver, nature string) string {
	switch nature {
	case "own_way":
		if params.OwnWayData != nil {
			return params.OwnWayData.WayName
		}
	case "mentoring_way":
		if params.MentoringData != nil {
			return params.MentoringData.WayName
		}
	}
	return ""
}

func (ns *NotificationService) getURLForNature(params *schemas.NotificationReceiver, nature string) string {
	wayID := ""
	switch nature {
	case "own_way":
		if params.OwnWayData != nil {
			wayID = params.OwnWayData.WayID
		}
	case "mentoring_way":
		if params.MentoringData != nil {
			wayID = params.MentoringData.WayID
		}
	}
	if wayID != "" {
		return "/ways/" + wayID
	}
	return ""
}

func (ns *NotificationService) UpdateNotification(ctx context.Context, notificationUUID string, isRead bool) (*schemas.NotificationResponse, error) {
	id, err := uuid.Parse(notificationUUID)
	if err != nil {
		return nil, err
	}

	result, err := ns.repo.UpdateNotification(ctx, db.UpdateNotificationParams{
		NotificationUuid: pgtype.UUID{Bytes: id, Valid: true},
		IsRead:           pgtype.Bool{Bool: isRead, Valid: true},
	})
	if err != nil {
		return nil, err
	}

	return &schemas.NotificationResponse{
		UUID:   util.ConvertPgUUIDToUUID(result.Uuid).String(),
		IsRead: result.IsRead,
	}, nil
}

func (ns *NotificationService) GetNotificationList(ctx context.Context, userUUID string, limit, offset int32, isOnlyNew bool) (*schemas.GetNotificationListResponse, error) {
	uid, err := uuid.Parse(userUUID)
	if err != nil {
		return nil, err
	}
	pgUserUUID := pgtype.UUID{Bytes: uid, Valid: true}

	notifications, err := ns.repo.GetNotificationListByUserID(ctx, db.GetNotificationListByUserIDParams{
		UserUuid:      pgUserUUID,
		RequestLimit:  limit,
		RequestOffset: offset,
		IsOnlyNew:     isOnlyNew,
	})
	if err != nil {
		return nil, err
	}

	totalResult, _ := ns.repo.GetAmountOfUnreadNotificationsByUserID(ctx, pgUserUUID)
	totalSize := totalResult.TotalSize
	unreadSize := totalResult.UnreadNotificationsSize

	items := lo.Map(notifications, func(n db.Notification, _ int) schemas.NotificationResponse {
		return schemas.NotificationResponse{
			UUID:        util.ConvertPgUUIDToUUID(n.Uuid).String(),
			UserUUID:    util.ConvertPgUUIDToUUID(n.UserUuid).String(),
			IsRead:      n.IsRead,
			Description: lo.FromPtr(util.MarshalPgText(n.Description)),
			URL:         lo.FromPtr(util.MarshalPgText(n.Url)),
			Nature:      string(n.Nature),
			CreatedAt:   lo.FromPtr(util.MarshalPgTimestamp(n.CreatedAt)),
		}
	})

	return &schemas.GetNotificationListResponse{
		TotalSize:     int32(totalSize),
		UnreadSize:    int32(unreadSize),
		Notifications: items,
	}, nil
}

func (ns *NotificationService) GetEnabledSettingsByUser(ctx context.Context, userUUID string) ([]schemas.NotificationSettingResponse, error) {
	uid, err := uuid.Parse(userUUID)
	if err != nil {
		return nil, err
	}
	pgUserUUID := pgtype.UUID{Bytes: uid, Valid: true}

	settings, err := ns.repo.GetEnabledNotificationSettingListByUserID(ctx, pgUserUUID)
	if err != nil {
		return nil, err
	}

	return lo.Map(settings, func(s db.NotificationSetting, _ int) schemas.NotificationSettingResponse {
		return schemas.NotificationSettingResponse{
			UUID:      util.ConvertPgUUIDToUUID(s.Uuid).String(),
			UserUUID:  util.ConvertPgUUIDToUUID(s.UserUuid).String(),
			Nature:    string(s.Nature),
			Channel:   string(s.Channel),
			IsEnabled: s.IsEnabled,
		}
	}), nil
}