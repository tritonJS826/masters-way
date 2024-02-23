package schemas

import (
	"github.com/google/uuid"
)

type CreatePlanPayload struct {
	Job            string    `json:"job"`
	EstimationTime int32     `json:"estimationTime"`
	IsDone         bool      `json:"isDone"`
	OwnerUuid      uuid.UUID `json:"ownerUuid"`
	DayReportUuid  uuid.UUID `json:"dayReportUuid"`
}

type UpdatePlanPayload struct {
	Job            string `json:"job"`
	EstimationTime int32  `json:"estimationTime"`
	IsDone         bool   `json:"isDone"`
}

type PlanPlainResponse struct {
	Job            string            `json:"job"`
	EstimationTime int32             `json:"estimationTime"`
	Owner          UserPlainResponse `json:"owner"`
	IsDone         bool              `json:"isDone"`
}
