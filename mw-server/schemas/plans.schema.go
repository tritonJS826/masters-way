package schemas

type CreatePlanPayload struct {
	Job            string `json:"job" validate:"required"`
	EstimationTime int32  `json:"estimationTime" validate:"required"`
	IsDone         bool   `json:"isDone" validate:"required"`
	OwnerUuid      string `json:"ownerUuid" validate:"required"`
	DayReportUuid  string `json:"dayReportUuid" validate:"required"`
}

type UpdatePlanPayload struct {
	Job            string `json:"job"`
	EstimationTime int32  `json:"estimationTime"`
	IsDone         bool   `json:"isDone"`
}

type PlanPopulatedResponse struct {
	Uuid           string           `json:"uuid" validate:"required"`
	CreatedAt      string           `json:"createdAt" validate:"required"`
	UpdatedAt      string           `json:"updatedAt" validate:"required"`
	Job            string           `json:"job" validate:"required"`
	EstimationTime int32            `json:"estimationTime" validate:"required"`
	OwnerUuid      string           `json:"ownerUuid" validate:"required"`
	OwnerName      string           `json:"ownerName" validate:"required"`
	IsDone         bool             `json:"isDone" validate:"required"`
	DayReportUuid  string           `json:"dayReportUuid" validate:"required"`
	Tags           []JobTagResponse `json:"tags" validate:"required"`
}
