package schemas

import (
	"github.com/google/uuid"
)

type CreateProblemPayload struct {
	Description   string    `json:"description"`
	IsDone        bool      `json:"isDone"`
	OwnerUuid     uuid.UUID `json:"ownerUuid"`
	DayReportUuid uuid.UUID `json:"dayReportUuid"`
}

type UpdateProblemPayload struct {
	Description string `json:"description"`
	IsDone      bool   `json:"isDone"`
}

type ProblemPlainResponse struct {
	Description string            `json:"description"`
	Owner       UserPlainResponse `json:"owner"`
	IsDone      bool              `json:"isDone"`
}
