package services

import (
	db "mwstorage/internal/db/sqlc"

	"github.com/jackc/pgx/v5/pgxpool"
)

type Service struct {
	MessagesService *MessagesService
	DevService      *DevService
}

func NewService(pool *pgxpool.Pool) *Service {
	queries := db.New(pool)
	return &Service{
		MessagesService: NewMessagesService(pool, queries),
		DevService:      NewDevService(pool, queries),
	}
}
