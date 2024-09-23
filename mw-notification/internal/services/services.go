package services

import (
	db "mwnotification/internal/db/sqlc"

	"github.com/jackc/pgx/v5/pgxpool"
)

type Service struct {
	NotificationService *NotificationService
	DevService          *DevService
}

func NewService(pool *pgxpool.Pool) *Service {
	queries := db.New(pool)
	return &Service{
		NotificationService: NewNotificationService(pool, queries),
		DevService:          NewDevService(pool, queries),
	}
}
