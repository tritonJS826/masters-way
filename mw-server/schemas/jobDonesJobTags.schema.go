package schemas

import (
	"github.com/google/uuid"
)

type CreateJobDoneJobTagPayload struct {
	JobDoneUuid uuid.UUID `json:"jobDoneUuid"`
	JobTagUuid  uuid.UUID `json:"jobTagUuid"`
}
