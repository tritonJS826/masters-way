package schemas

import (
	"github.com/google/uuid"
)

type CreatePlanPayload struct {
	Job            string    `json:"job" validate:"required"`
	EstimationTime int32     `json:"estimationTime" validate:"required"`
	IsDone         bool      `json:"isDone" validate:"required"`
	OwnerUuid      uuid.UUID `json:"ownerUuid" validate:"required"`
	DayReportUuid  uuid.UUID `json:"dayReportUuid" validate:"required"`
}

type UpdatePlanPayload struct {
	Job            string `json:"job"`
	EstimationTime int32  `json:"estimationTime"`
	IsDone         bool   `json:"isDone"`
}

type PlanPlainResponse struct {
	Job            string            `json:"job" validate:"required"`
	EstimationTime int32             `json:"estimationTime" validate:"required"`
	Owner          UserPlainResponse `json:"owner" validate:"required"`
	IsDone         bool              `json:"isDone" validate:"required"`
}
