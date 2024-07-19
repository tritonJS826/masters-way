package database

import (
	"context"
	"fmt"
	"mwchat/internal/config"

	"github.com/jackc/pgx/v5/pgxpool"
)

func NewPostgresDB(cfg *config.Config) (*pgxpool.Pool, error) {
	ctx := context.Background()

	pgxPool, err := pgxpool.New(ctx, cfg.DbSource)
	if err != nil {
		return nil, fmt.Errorf("unable to create connection pool: %w", err)
	}

	if err := pgxPool.Ping(ctx); err != nil {
		return nil, fmt.Errorf("unable to ping database: %w", err)
	}

	return pgxPool, nil
}
