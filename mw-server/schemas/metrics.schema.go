package schemas

import (
	"time"

	"github.com/google/uuid"
)

type CreateMetricPayload struct {
	Description      string    `json:"description" validate:"required"`
	IsDone           bool      `json:"isDone" validate:"required"`
	MetricEstimation int32     `json:"estimationTime" validate:"required"`
	DoneDate         int32     `json:"doneDate" validate:"required"`
	WayUuid          uuid.UUID `json:"wayUuid" validate:"required"`
}

type UpdateMetricPayload struct {
	Description      string `json:"description"`
	IsDone           bool   `json:"isDone"`
	DoneDate         int32  `json:"doneDate"`
	MetricEstimation int32  `json:"estimationTime"`
}

type MetricResponse struct {
	CreatedAt        time.Time `json:"createdAt" validate:"required"`
	UpdatedAt        time.Time `json:"updatedAt" validate:"required"`
	Description      string    `json:"description" validate:"required"`
	IsDone           bool      `json:"isDone" validate:"required"`
	DoneDate         int32     `json:"doneDate" validate:"required"`
	MetricEstimation int32     `json:"estimationTime" validate:"required"`
}
