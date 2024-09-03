package services

import (
	"context"
	"os"

	"github.com/jackc/pgx/v5/pgxpool"
)

type IDevRepository interface {
	RegenerateDbData(ctx context.Context) error
	RemoveEverything(ctx context.Context) error
}

type DevService struct {
	devRepository IDevRepository
	pgxPool       *pgxpool.Pool
}

func NewDevService(devRepository IDevRepository, pgxPool *pgxpool.Pool) *DevService {
	return &DevService{devRepository, pgxPool}
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

	// migrate schemas according to migrations file
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
