package schemas

import (
	"github.com/google/uuid"
)

type CreateJobDonePayload struct {
	Description   string    `json:"description"`
	Time          int32     `json:"time"`
	DayReportUuid uuid.UUID `json:"dayReportUuid"`
	OwnerUuid     uuid.UUID `json:"ownerUuid"`
}

type UpdateJobDone struct {
	Description string `json:"description"`
	Time        int32  `json:"time"`
}

type JobDonePlainResponse struct {
	Description string            `json:"description"`
	Time        int32             `json:"time"`
	Owner       UserPlainResponse `json:"owner"`
}
