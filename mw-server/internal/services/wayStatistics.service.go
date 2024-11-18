package services

import (
	"context"
	db "mw-server/internal/db/sqlc"
	"mw-server/internal/schemas"
	"mw-server/pkg/util"
	"time"

	"github.com/google/uuid"
	"github.com/jackc/pgx/v5/pgtype"
	"github.com/samber/lo"
)

type IWayStatisticsRepository interface {
	GetTimeSpentByDayChart(ctx context.Context, arg db.GetTimeSpentByDayChartParams) ([]db.GetTimeSpentByDayChartRow, error)
	GetOverallInformation(ctx context.Context, arg db.GetOverallInformationParams) (db.GetOverallInformationRow, error)
	GetLabelStatistics(ctx context.Context, arg db.GetLabelStatisticsParams) ([]db.GetLabelStatisticsRow, error)
}

type WayStatisticsService struct {
	wayStatisticsRepository IWayStatisticsRepository
}

func NewWayStatisticsService(wayStatisticsRepository IWayStatisticsRepository) *WayStatisticsService {
	return &WayStatisticsService{wayStatisticsRepository}
}

type GetWayStatisticsTriplePeriodParams struct {
	WayUUIDs       []uuid.UUID
	TotalStartDate time.Time
	EndDate        time.Time
}

func (ws *WayStatisticsService) GetWayStatisticsTriplePeriod(ctx context.Context, params *GetWayStatisticsTriplePeriodParams) (*schemas.WayStatisticsTriplePeriod, error) {
	wayPgUUIDs := lo.Map(params.WayUUIDs, func(wayUUID uuid.UUID, _ int) pgtype.UUID {
		return pgtype.UUID{Bytes: wayUUID, Valid: true}
	})

	endDate := params.EndDate.Truncate(24 * time.Hour).Add(23*time.Hour + 59*time.Minute + 59*time.Second + 999*time.Millisecond)
	endDatePgTimestamp := pgtype.Timestamp{Time: endDate, Valid: true}

	totalTimeStatisticsParams := &GetWayStatisticsParams{
		WayPgUUIDs:           wayPgUUIDs,
		StartDatePgTimestamp: pgtype.Timestamp{Time: params.TotalStartDate.Truncate(24 * time.Hour), Valid: true},
		EndDatePgTimestamp:   endDatePgTimestamp,
	}
	totalTimeStatistics, err := ws.GetWayStatistics(ctx, totalTimeStatisticsParams)
	if err != nil {
		return nil, err
	}

	lastMonthStatisticsParams := &GetWayStatisticsParams{
		WayPgUUIDs:           wayPgUUIDs,
		StartDatePgTimestamp: pgtype.Timestamp{Time: params.EndDate.AddDate(0, -1, 1).Truncate(24 * time.Hour), Valid: true},
		EndDatePgTimestamp:   endDatePgTimestamp,
	}
	lastMonthStatistics, err := ws.GetWayStatistics(ctx, lastMonthStatisticsParams)
	if err != nil {
		return nil, err
	}

	lastWeekStatisticsParams := &GetWayStatisticsParams{
		WayPgUUIDs:           wayPgUUIDs,
		StartDatePgTimestamp: pgtype.Timestamp{Time: params.EndDate.AddDate(0, 0, -6).Truncate(24 * time.Hour), Valid: true},
		EndDatePgTimestamp:   endDatePgTimestamp,
	}
	lastWeekStatistics, err := ws.GetWayStatistics(ctx, lastWeekStatisticsParams)
	if err != nil {
		return nil, err
	}

	return &schemas.WayStatisticsTriplePeriod{
		TotalTime: *totalTimeStatistics,
		LastMonth: *lastMonthStatistics,
		LastWeek:  *lastWeekStatistics,
	}, nil
}

type GetWayStatisticsParams struct {
	WayPgUUIDs           []pgtype.UUID
	StartDatePgTimestamp pgtype.Timestamp
	EndDatePgTimestamp   pgtype.Timestamp
}

func (ws *WayStatisticsService) GetWayStatistics(ctx context.Context, params *GetWayStatisticsParams) (*schemas.WayStatistics, error) {
	timeSpentByDayChart, err := ws.GetTimeSpentByDayChart(ctx, params)
	if err != nil {
		return nil, err
	}

	overallInformation, err := ws.GetOverallInformation(ctx, params)
	if err != nil {
		return nil, err
	}

	getLabelStatistics, err := ws.GetLabelStatistics(ctx, params)
	if err != nil {
		return nil, err
	}

	return &schemas.WayStatistics{
		TimeSpentByDayChart: timeSpentByDayChart,
		LabelStatistics:     *getLabelStatistics,
		OverallInformation:  *overallInformation,
	}, nil
}

func (ws *WayStatisticsService) GetTimeSpentByDayChart(ctx context.Context, params *GetWayStatisticsParams) ([]schemas.TimeSpentByDayPoint, error) {
	timeSpentByDayChartParams := db.GetTimeSpentByDayChartParams{
		WayUuids:  params.WayPgUUIDs,
		StartDate: params.StartDatePgTimestamp,
		EndDate:   params.EndDatePgTimestamp,
	}

	timeSpentByDayChartRaw, err := ws.wayStatisticsRepository.GetTimeSpentByDayChart(ctx, timeSpentByDayChartParams)
	if err != nil {
		return nil, err
	}

	timeSpentByDayMap := make(map[time.Time]int, len(timeSpentByDayChartRaw))
	for _, timeSpentByDay := range timeSpentByDayChartRaw {
		truncatedDate := timeSpentByDay.PointDate.Time.Truncate(24 * time.Hour)
		timeSpentByDayMap[truncatedDate] += int(timeSpentByDay.PointValue)
	}

	daysCount := int(params.EndDatePgTimestamp.Time.Sub(params.StartDatePgTimestamp.Time).Hours() / 24)
	timeSpentByDayChart := make([]schemas.TimeSpentByDayPoint, 0, daysCount)
	for date := params.StartDatePgTimestamp.Time; !date.After(params.EndDatePgTimestamp.Time); date = date.AddDate(0, 0, 1) {
		value := timeSpentByDayMap[date]
		timeSpentByDayChart = append(timeSpentByDayChart, schemas.TimeSpentByDayPoint{
			Value: value,
			Date:  date.Format(util.DEFAULT_STRING_LAYOUT),
		})
	}

	return timeSpentByDayChart, nil
}

func (ws *WayStatisticsService) GetOverallInformation(ctx context.Context, params *GetWayStatisticsParams) (*schemas.OverallInformation, error) {
	overallInformationParams := db.GetOverallInformationParams{
		WayUuids:  params.WayPgUUIDs,
		StartDate: params.StartDatePgTimestamp,
		EndDate:   params.EndDatePgTimestamp,
	}

	overallInformationRaw, err := ws.wayStatisticsRepository.GetOverallInformation(ctx, overallInformationParams)
	if err != nil {
		return nil, err
	}

	return &schemas.OverallInformation{
		TotalTime:                 int(overallInformationRaw.TotalTime),
		TotalReports:              int(overallInformationRaw.TotalReports),
		FinishedJobs:              int(overallInformationRaw.FinishedJobs),
		AverageTimePerCalendarDay: int(overallInformationRaw.AverageTimePerCalendarDay),
		AverageTimePerWorkingDay:  int(overallInformationRaw.AverageTimePerWorkingDay),
		AverageJobTime:            int(overallInformationRaw.AverageJobTime),
	}, nil
}

func (ws *WayStatisticsService) GetLabelStatistics(ctx context.Context, params *GetWayStatisticsParams) (*schemas.LabelStatistics, error) {
	labelStatisticsParams := db.GetLabelStatisticsParams{
		WayUuids:  params.WayPgUUIDs,
		StartDate: params.StartDatePgTimestamp,
		EndDate:   params.EndDatePgTimestamp,
	}

	labelStatisticsRaw, err := ws.wayStatisticsRepository.GetLabelStatistics(ctx, labelStatisticsParams)
	if err != nil {
		return nil, err
	}

	labelsInfo := lo.Map(labelStatisticsRaw, func(dbLabel db.GetLabelStatisticsRow, _ int) schemas.LabelInfo {
		return schemas.LabelInfo{
			Label: schemas.Label{
				ID:          util.ConvertPgUUIDToUUID(dbLabel.LabelUuid).String(),
				Name:        dbLabel.LabelName,
				Color:       dbLabel.LabelColor,
				Description: dbLabel.LabelDescription,
			},
			JobsAmount:           int(dbLabel.JobsAmount),
			JobsAmountPercentage: int(dbLabel.JobsAmountPercentage),
			Time:                 int(dbLabel.JobsTime),
			TimePercentage:       int(dbLabel.JobsTimePercentage),
		}
	})

	return &schemas.LabelStatistics{Labels: labelsInfo}, nil
}
