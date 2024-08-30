package services

import (
	"context"
	"fmt"
	"mwserver/internal/config"
	"os/exec"

	"github.com/jackc/pgx/v5/pgxpool"
)

type IDevRepository interface {
	RegenerateDbData(ctx context.Context) error
}

type DevService struct {
	devRepository IDevRepository
	config        *config.Config
	pgxPool       *pgxpool.Pool
}

func NewDevService(devRepository IDevRepository, config *config.Config, pgxPool *pgxpool.Pool) *DevService {
	return &DevService{devRepository, config, pgxPool}
}

func (ds *DevService) ResetDb(ctx context.Context) error {
	downCmd := exec.Command(
		"migrate",
		"-path",
		"internal/db/migration",
		"-database",
		ds.config.DBSource,
		"-verbose",
		"down",
		"1",
	)
	if output, err := downCmd.CombinedOutput(); err != nil {
		fmt.Printf("Down migration failed: %v\nOutput: %s\n", err, string(output))
		return err
	}

	upCmd := exec.Command(
		"migrate",
		"-path",
		"internal/db/migration",
		"-database",
		ds.config.DBSource,
		"-verbose",
		"up",
		"1",
	)
	if output, err := upCmd.CombinedOutput(); err != nil {
		fmt.Printf("Up migration failed: %v\nOutput: %s\n", err, string(output))
		return err
	}

	err := ds.devRepository.RegenerateDbData(ctx)
	if err != nil {
		return err
	}

	ds.pgxPool.Reset()

	return nil
}
