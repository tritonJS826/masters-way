package services

import (
	db "mwstorage/internal/db/sqlc"

	"github.com/jackc/pgx/v5/pgxpool"
)

type Service struct {
	GoogleDriveService *GoogleDriveService
	FileService        *FileService
	DevService         *DevService
}

func NewService(pool *pgxpool.Pool) *Service {
	queries := db.New(pool)
	return &Service{
		GoogleDriveService: NewGoogleDriveService(),
		FileService:        NewFileService(queries),
		DevService:         NewDevService(pool, queries),
	}
}
