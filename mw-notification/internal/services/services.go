package services

import (
	db "mwnotification/internal/db/sqlc"

	"github.com/jackc/pgx/v5/pgxpool"
)

type Service struct {
	NotificationService        *NotificationService
	EnabledNotificationService *EnabledNotificationService
	DevService                 *DevService
}

func NewService(pool *pgxpool.Pool) *Service {
	queries := db.New(pool)
	return &Service{
		NotificationService:        NewNotificationService(queries),
		EnabledNotificationService: NewEnabledNotificationService(queries),
		DevService:                 NewDevService(pool, queries),
	}
}
