package services

// import (
// 	"context"

// 	"github.com/jackc/pgx/v5/pgxpool"
// )

// type IDevRepository interface {
// 	RegenerateDbData(ctx context.Context) error
// 	RemoveEverything(ctx context.Context) error
// }

// type DevService struct {
// 	devRepository IDevRepository
// 	pgxPool       *pgxpool.Pool
// }

// func NewDevService(devRepository IDevRepository, pgxPool *pgxpool.Pool) *DevService {
// 	return &DevService{devRepository, pgxPool}
// }

// func (ds *DevService) ResetDB(ctx context.Context) error {
// }
