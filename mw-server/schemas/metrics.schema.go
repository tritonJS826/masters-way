package schemas

import "github.com/google/uuid"

type CreateMetricPayload struct {
	Description      string `json:"description" validate:"required"`
	IsDone           bool   `json:"isDone" validate:"required"`
	MetricEstimation int32  `json:"estimationTime" validate:"required"`
	DoneDate         string `json:"doneDate" validate:"required"`
	WayUuid          string `json:"wayUuid" validate:"required"`
}

type UpdateMetricPayload struct {
	Description      *string `json:"description"`
	IsDone           *bool   `json:"isDone"`
	MetricEstimation *int32  `json:"estimationTime"`
}

type MetricResponse struct {
	Uuid             string  `json:"uuid" validate:"required"`
	Description      string  `json:"description" validate:"required"`
	IsDone           bool    `json:"isDone" validate:"required"`
	DoneDate         *string `json:"doneDate" validate:"required" extensions:"x-nullable"`
	MetricEstimation int32   `json:"estimationTime" validate:"required"`
}

type MetricPopulatedDTO struct {
	UUID             uuid.UUID `json:"uuid"`
	Description      string    `json:"description"`
	IsDone           bool      `json:"is_done"`
	DoneDate         *string   `json:"done_date"`
	MetricEstimation int32     `json:"metric_estimation"`
	WayUuid          uuid.UUID `json:"way_uuid"`
}
