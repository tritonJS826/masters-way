package services

import (
	"context"
	db "mw-server/internal/db/sqlc"
	"mw-server/internal/schemas"
	"mw-server/pkg/util"
	"time"

	"github.com/google/uuid"
	"github.com/jackc/pgx/v5/pgtype"
)

type IMetricRepository interface {
	CreateMetric(ctx context.Context, arg db.CreateMetricParams) (db.Metric, error)
	UpdateMetric(ctx context.Context, arg db.UpdateMetricParams) (db.Metric, error)
	DeleteMetric(ctx context.Context, metricsUuid pgtype.UUID) (db.Metric, error)
	GetListMetricsByWayUuid(ctx context.Context, wayUuid pgtype.UUID) ([]db.Metric, error)
}

type MetricService struct {
	metricRepository IMetricRepository
}

func NewMetricService(metricRepository IMetricRepository) *MetricService {
	return &MetricService{metricRepository}
}

type MetricResult struct {
	MetricResponse *schemas.MetricResponse
	WayID          string
}

func (ms *MetricService) CreateMetric(ctx context.Context, payload *schemas.CreateMetricPayload) (*MetricResult, error) {
	now := time.Now()
	var parsedTime time.Time
	var parserTimeErr error
	if payload.DoneDate != nil && *payload.DoneDate != "" {
		parsedTime, parserTimeErr = time.Parse(util.DEFAULT_STRING_LAYOUT, *payload.DoneDate)
	} else {
		parserTimeErr = nil
	}

	doneDate := pgtype.Timestamp{
		Time:  parsedTime,
		Valid: parserTimeErr == nil, // Set Valid based on parsing result
	}

	// Handle ParentUuid parsing
	var parserParentUuid uuid.UUID
	var parserParentUuidErr error
	var parentUuid pgtype.UUID
	if payload.ParentUuid != nil && *payload.ParentUuid != "" {
		parserParentUuid, parserParentUuidErr = uuid.Parse(*payload.ParentUuid)
		parentUuid = pgtype.UUID{Bytes: parserParentUuid, Valid: parserParentUuidErr == nil}
	} else {
		parentUuid = pgtype.UUID{Valid: false} // Set to "NULL" (Valid: false) if ParentUuid is nil
	}

	// Construct the db.CreateMetricParams struct
	args := db.CreateMetricParams{
		Description:      payload.Description,
		IsDone:           payload.IsDone,
		DoneDate:         doneDate,
		MetricEstimation: int32(payload.MetricEstimation),
		WayUuid:          pgtype.UUID{Bytes: uuid.MustParse(payload.WayUuid), Valid: true},
		UpdatedAt:        pgtype.Timestamp{Time: now, Valid: true},
		ParentUuid:       parentUuid, // Correctly set ParentUuid (with Valid = false if nil)
	}

	metric, err := ms.metricRepository.CreateMetric(ctx, args)
	if err != nil {
		return nil, err
	}

	return &MetricResult{
		MetricResponse: &schemas.MetricResponse{
			Uuid:             util.ConvertPgUUIDToUUID(metric.Uuid).String(),
			Description:      metric.Description,
			IsDone:           metric.IsDone,
			DoneDate:         util.MarshalPgTimestamp(metric.DoneDate),
			ParentUuid:       util.MarshalPgUUID(metric.ParentUuid),
			MetricEstimation: metric.MetricEstimation,
		},
		WayID: util.ConvertPgUUIDToUUID(metric.WayUuid).String(),
	}, nil
}

type UpdateMetricParams struct {
	MetricID         string
	Description      *string
	IsDone           *bool
	MetricEstimation *int32
}

func (ms *MetricService) UpdateMetric(ctx context.Context, params *UpdateMetricParams) (*MetricResult, error) {
	now := time.Now()

	var isDonePg pgtype.Bool
	var doneDatePg pgtype.Timestamp
	if params.IsDone != nil {
		isDonePg = pgtype.Bool{Bool: *params.IsDone, Valid: true}
		doneDatePg = pgtype.Timestamp{Time: now, Valid: *params.IsDone}
	}

	var descriptionPg pgtype.Text
	if params.Description != nil {
		descriptionPg = pgtype.Text{String: *params.Description, Valid: true}
	}

	var metricEstimationPg pgtype.Int4
	if params.MetricEstimation != nil {
		metricEstimationPg = pgtype.Int4{Int32: *params.MetricEstimation, Valid: true}
	}

	args := db.UpdateMetricParams{
		Uuid:             pgtype.UUID{Bytes: uuid.MustParse(params.MetricID), Valid: true},
		UpdatedAt:        pgtype.Timestamp{Time: now, Valid: true},
		Description:      descriptionPg,
		IsDone:           isDonePg,
		DoneDate:         doneDatePg,
		MetricEstimation: metricEstimationPg,
	}

	metric, err := ms.metricRepository.UpdateMetric(ctx, args)
	if err != nil {
		return nil, err
	}

	return &MetricResult{
		MetricResponse: &schemas.MetricResponse{
			Uuid:             util.ConvertPgUUIDToUUID(metric.Uuid).String(),
			Description:      metric.Description,
			IsDone:           metric.IsDone,
			DoneDate:         util.MarshalPgTimestamp(metric.DoneDate),
			ParentUuid:       util.MarshalPgUUID(metric.ParentUuid),
			MetricEstimation: metric.MetricEstimation,
		},
		WayID: util.ConvertPgUUIDToUUID(metric.WayUuid).String(),
	}, nil
}

func (ms *MetricService) DeleteMetricById(ctx context.Context, metricID string) (string, error) {
	removedMetric, err := ms.metricRepository.DeleteMetric(ctx, pgtype.UUID{Bytes: uuid.MustParse(metricID), Valid: true})
	if err != nil {
		return "", err
	}

	return util.ConvertPgUUIDToUUID(removedMetric.WayUuid).String(), nil
}

type MetricInfo struct {
	Description string
	IsDone      bool
	DoneDate    *string
}

func (ms *MetricService) GetMetricsByWayUuid(ctx context.Context, wayID uuid.UUID) ([]MetricInfo, error) {
	metrics, err := ms.metricRepository.GetListMetricsByWayUuid(ctx, pgtype.UUID{Bytes: wayID, Valid: true})
	if err != nil {
		return nil, err
	}

	result := make([]MetricInfo, len(metrics))
	for i, m := range metrics {
		result[i] = MetricInfo{
			Description: m.Description,
			IsDone:      m.IsDone,
			DoneDate:    util.MarshalPgTimestamp(m.DoneDate),
		}
	}
	return result, nil
}
