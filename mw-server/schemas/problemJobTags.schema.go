package schemas

import (
	"github.com/google/uuid"
)

type CreateProblemJobTagPayload struct {
	ProblemUuid uuid.UUID `json:"problemUuid"`
	JobTagUuid  uuid.UUID `json:"jobTagUuid"`
}
