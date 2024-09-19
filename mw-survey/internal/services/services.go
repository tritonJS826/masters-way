package services

import (
	db "mwsurvey/internal/db/sqlc"

	"github.com/jackc/pgx/v5/pgxpool"
)

type Service struct {
	SurveyService *SurveyService
	DevService    *DevService
}

func NewService(pool *pgxpool.Pool) *Service {
	queries := db.New(pool)
	return &Service{
		SurveyService: NewSurveyService(queries),
		DevService:    NewDevService(pool, queries),
	}
}
