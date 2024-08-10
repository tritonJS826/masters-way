package services

import (
	"context"

	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"

	db "mwchat/internal/db/sqlc"
)

type DevRepository interface {
	RegenerateDbData(ctx context.Context) error
	RemoveEverything(ctx context.Context) error
	WithTx(tx pgx.Tx) *db.Queries
}

type DevDBService struct {
	pool          *pgxpool.Pool
	devRepository DevRepository
}

func NewDevService(pool *pgxpool.Pool, roomsRepository DevRepository) *DevDBService {
	return &DevDBService{pool, roomsRepository}
}

func (roomsService *DevDBService) ResetDB(ctx context.Context) error {
	// migration, err := os.ReadFile("internal/db/migration/000001_init_schema.up.sql")
	// if err != nil {
	// 	return err
	// }

	err := roomsService.devRepository.RemoveEverything(ctx)
	if err != nil {
		return err
	}

	// // migrate schemas according to migrations file
	// _, err = roomsService.pool.Exec(ctx, string(migration))
	// if err != nil {
	// 	return err
	// }

	err = roomsService.devRepository.RegenerateDbData(ctx)
	if err != nil {
		return err
	}

	return nil
}
