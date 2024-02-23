package schemas

import (
	"time"

	"github.com/google/uuid"
)

type CreateMetricPayload struct {
	Description      string    `json:"description"`
	IsDone           bool      `json:"isDone"`
	MetricEstimation int32     `json:"estimationTime"`
	DoneDate         int32     `json:"doneDate"`
	WayUuid          uuid.UUID `json:"wayUuid"`
}

type UpdateMetricPayload struct {
	Description      string `json:"description"`
	IsDone           bool   `json:"isDone"`
	DoneDate         int32  `json:"doneDate"`
	MetricEstimation int32  `json:"estimationTime"`
}

type MetricResponse struct {
	CreatedAt        time.Time `json:"createdAt"`
	UpdatedAt        time.Time `json:"updatedAt"`
	Description      string    `json:"description"`
	IsDone           bool      `json:"isDone"`
	DoneDate         int32     `json:"doneDate"`
	MetricEstimation int32     `json:"estimationTime"`
}
