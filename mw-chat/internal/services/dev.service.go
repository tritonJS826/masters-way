package services

import (
	"context"

	"github.com/jackc/pgx/v5"

	db "mwchat/internal/db/sqlc"
)

type DevRepository interface {
	TruncateAllTables(ctx context.Context) error
	WithTx(tx pgx.Tx) *db.Queries
}

type DevDBService struct {
	devRepository DevRepository
}

func NewDevService(roomsRepository DevRepository) *DevDBService {
	return &DevDBService{roomsRepository}
}

func (roomsService *DevDBService) ResetDB(ctx context.Context) error {
	err := roomsService.devRepository.TruncateAllTables(ctx)
	if err != nil {
		return err
	}

	return nil
}
