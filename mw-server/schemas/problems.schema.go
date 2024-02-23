package schemas

import (
	"github.com/google/uuid"
)

type CreateProblemPayload struct {
	Description   string    `json:"description" validate:"required"`
	IsDone        bool      `json:"isDone" validate:"required"`
	OwnerUuid     uuid.UUID `json:"ownerUuid" validate:"required"`
	DayReportUuid uuid.UUID `json:"dayReportUuid" validate:"required"`
}

type UpdateProblemPayload struct {
	Description string `json:"description"`
	IsDone      bool   `json:"isDone"`
}

type ProblemPlainResponse struct {
	Description string            `json:"description" validate:"required"`
	Owner       UserPlainResponse `json:"owner" validate:"required"`
	IsDone      bool              `json:"isDone" validate:"required"`
}
