package services

import (
	"mwmail/internal/config"
	db "mwmail/internal/db/sqlc"

	"github.com/jackc/pgx/v5/pgxpool"
)

type Service struct {
	SmtpService *SmtpService
	MailService *MailService
	DevService  *DevService
}

func NewService(pool *pgxpool.Pool, newConfig *config.Config) *Service {
	queries := db.New(pool)
	return &Service{
		SmtpService: NewSmtpService(newConfig),
		MailService: NewMailService(queries),
		DevService:  NewDevService(pool, queries),
	}
}
