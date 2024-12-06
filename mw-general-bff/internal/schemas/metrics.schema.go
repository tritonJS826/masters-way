package schemas

type CreateMetricPayload struct {
	Description      string  `json:"description" validate:"required"`
	IsDone           bool    `json:"isDone" validate:"required"`
	MetricEstimation int32   `json:"estimationTime" validate:"required"`
	DoneDate         *string `json:"doneDate" validate:"required" extensions:"x-nullable"`
	WayUuid          string  `json:"wayUuid" validate:"required"`
	ParentUuid       *string `json:"parentUuid" validate:"required" extensions:"x-nullable"`
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
	ParentUuid       *string `json:"parentUuid" validate:"required" extensions:"x-nullable"`
}
