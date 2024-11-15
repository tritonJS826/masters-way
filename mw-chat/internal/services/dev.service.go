package services

import (
	"context"
	"os"

	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"

	db "mw-chat/internal/db/sqlc"
)

type DevRepository interface {
	RegenerateDbData(ctx context.Context) error
	RemoveEverything(ctx context.Context) error
	WithTx(tx pgx.Tx) *db.Queries
}

type DevService struct {
	pgxPool       *pgxpool.Pool
	devRepository DevRepository
}

func NewDevService(pool *pgxpool.Pool, roomsRepository DevRepository) *DevService {
	return &DevService{pool, roomsRepository}
}

func (ds *DevService) ResetDB(ctx context.Context) error {
	migration, err := os.ReadFile("internal/db/migration/000001_init_schema.up.sql")
	if err != nil {
		return err
	}

	err = ds.devRepository.RemoveEverything(ctx)
	if err != nil {
		return err
	}

	_, err = ds.pgxPool.Exec(ctx, string(migration))
	if err != nil {
		return err
	}

	err = ds.devRepository.RegenerateDbData(ctx)
	if err != nil {
		return err
	}

	ds.pgxPool.Reset()

	return nil
}
