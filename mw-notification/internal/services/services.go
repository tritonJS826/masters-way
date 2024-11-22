package services

import (
	db "mw-notification/internal/db/sqlc"

	"github.com/jackc/pgx/v5/pgxpool"
)

type Service struct {
	NotificationService        *NotificationService
	NotificationSettingService *NotificationSettingService
	DevService                 *DevService
}

func NewService(pool *pgxpool.Pool) *Service {
	queries := db.New(pool)
	return &Service{
		NotificationService:        NewNotificationService(queries),
		NotificationSettingService: NewNotificationSettingService(queries),
		DevService:                 NewDevService(pool, queries),
	}
}
