package schemas

type CreateMetricPayload struct {
	Description      string `json:"description" validate:"required"`
	IsDone           bool   `json:"isDone" validate:"required"`
	MetricEstimation int32  `json:"estimationTime" validate:"required"`
	DoneDate         string `json:"doneDate" validate:"required"`
	WayUuid          string `json:"wayUuid" validate:"required"`
}

type UpdateMetricPayload struct {
	Description      string `json:"description"`
	IsDone           bool   `json:"isDone"`
	DoneDate         string `json:"doneDate"`
	MetricEstimation int32  `json:"estimationTime"`
}

type MetricResponse struct {
	Uuid             string  `json:"uuid" validate:"required"`
	CreatedAt        string  `json:"createdAt" validate:"required"`
	UpdatedAt        string  `json:"updatedAt" validate:"required"`
	Description      string  `json:"description" validate:"required"`
	IsDone           bool    `json:"isDone" validate:"required"`
	DoneDate         *string `json:"doneDate" validate:"required" extensions:"x-nullable"`
	MetricEstimation int32   `json:"estimationTime" validate:"required"`
}
