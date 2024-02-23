package schemas

import (
	"time"

	"github.com/google/uuid"
)

type CreateMetricPayload struct {
	Description      string    `json:"description"`
	IsDone           bool      `json:"isDone"`
	MetricEstimation int64     `json:"estimationTime"`
	DoneDate         int64     `json:"doneDate"`
	WayUuid          uuid.UUID `json:"wayUuid"`
}

type UpdateMetricPayload struct {
	Description      string `json:"description"`
	IsDone           bool   `json:"isDone"`
	DoneDate         int64  `json:"doneDate"`
	MetricEstimation int64  `json:"estimationTime"`
}

type MetricResponse struct {
	CreatedAt        time.Time `json:"createdAt"`
	UpdatedAt        time.Time `json:"updatedAt"`
	Description      string    `json:"description"`
	IsDone           bool      `json:"isDone"`
	DoneDate         int64     `json:"doneDate"`
	MetricEstimation int64     `json:"estimationTime"`
}
