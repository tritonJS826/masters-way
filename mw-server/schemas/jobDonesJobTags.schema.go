package schemas

import (
	"github.com/google/uuid"
)

type CreateJobDoneJobTagPayload struct {
	JobDoneUuid uuid.UUID `json:"jobDoneUuid" validate:"required"`
	JobTagUuid  uuid.UUID `json:"jobTagUuid" validate:"required"`
}
