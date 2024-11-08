package services

// import (
// 	"context"
// 	"mwserver/internal/schemas"
// )

// type MetricService struct {
// 	metricRepository IMetricRepository
// }

// func NewMetricService(metricRepository IMetricRepository) *MetricService {
// 	return &MetricService{metricRepository}
// }

// type MetricResult struct {
// 	MetricResponse *schemas.MetricResponse
// 	WayID          string
// }

// func (ms *MetricService) CreateMetric(ctx context.Context, payload *schemas.CreateMetricPayload) (*MetricResult, error) {
// }

// type UpdateMetricParams struct {
// 	MetricID         string
// 	Description      *string
// 	IsDone           *bool
// 	MetricEstimation *int32
// }

// func (ms *MetricService) UpdateMetric(ctx context.Context, params *UpdateMetricParams) (*MetricResult, error) {
// }

// func (ms *MetricService) DeleteMetricById(ctx context.Context, metricID string) (string, error) {
// }
