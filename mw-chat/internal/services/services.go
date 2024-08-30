package services

import (
	db "mwchat/internal/db/sqlc"

	"github.com/jackc/pgx/v5/pgxpool"
)

type Service struct {
	RoomsService    *RoomsService
	MessagesService *MessagesService
	DevService      *DevService
}

func NewService(pool *pgxpool.Pool) *Service {
	queries := db.New(pool)
	return &Service{
		RoomsService:    NewRoomsService(pool, queries),
		MessagesService: NewMessagesService(pool, queries),
		DevService:      NewDevService(pool, queries),
	}
}
