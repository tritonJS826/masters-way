package schemas

import (
	"github.com/google/uuid"
)

type CreateProblemJobTagPayload struct {
	ProblemUuid uuid.UUID `json:"problemUuid" validate:"required"`
	JobTagUuid  uuid.UUID `json:"jobTagUuid" validate:"required"`
}
