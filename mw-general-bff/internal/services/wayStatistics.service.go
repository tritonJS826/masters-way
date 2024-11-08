package services

// import (
// 	"context"
// 	"mwserver/internal/schemas"
// 	"time"

// 	"github.com/google/uuid"
// 	"github.com/jackc/pgx/v5/pgtype"
// )

// type WayStatisticsService struct {
// }

// func NewWayStatisticsService() *WayStatisticsService {
// 	return &WayStatisticsService{}
// }

// type GetWayStatisticsTriplePeriodParams struct {
// 	WayUUIDs       []uuid.UUID
// 	TotalStartDate time.Time
// 	EndDate        time.Time
// }

// func (ws *WayStatisticsService) GetWayStatisticsTriplePeriod(ctx context.Context, params *GetWayStatisticsTriplePeriodParams) (*schemas.WayStatisticsTriplePeriod, error) {
// }

// type GetWayStatisticsParams struct {
// 	WayPgUUIDs           []pgtype.UUID
// 	StartDatePgTimestamp pgtype.Timestamp
// 	EndDatePgTimestamp   pgtype.Timestamp
// }

// func (ws *WayStatisticsService) GetWayStatistics(ctx context.Context, params *GetWayStatisticsParams) (*schemas.WayStatistics, error) {
// }

// func (ws *WayStatisticsService) GetTimeSpentByDayChart(ctx context.Context, params *GetWayStatisticsParams) ([]schemas.TimeSpentByDayPoint, error) {
// }

// func (ws *WayStatisticsService) GetOverallInformation(ctx context.Context, params *GetWayStatisticsParams) (*schemas.OverallInformation, error) {
// }

// func (ws *WayStatisticsService) GetLabelStatistics(ctx context.Context, params *GetWayStatisticsParams) (*schemas.LabelStatistics, error) {
// }
