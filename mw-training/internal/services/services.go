package services

import (
	db "mw-training/internal/db/sqlc"

	"github.com/jackc/pgx/v5/pgxpool"
)

type Service struct {
	DevService                  *DevService
	FavoriteTrainingUserService *FavoriteTrainingUserService
	PracticeMaterialService     *PracticeMaterialService
}

func NewService(pool *pgxpool.Pool) *Service {
	queries := db.New(pool)
	return &Service{
		DevService:                  NewDevService(pool, queries),
		FavoriteTrainingUserService: NewFavoriteTrainingUserService(pool, queries),
		PracticeMaterialService:     NewPracticeMaterialService(pool, queries),
	}
}
