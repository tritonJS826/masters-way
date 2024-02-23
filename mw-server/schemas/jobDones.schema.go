package schemas

import (
	"github.com/google/uuid"
)

type CreateJobDonePayload struct {
	Description   string    `json:"description" validate:"required"`
	Time          int32     `json:"time" validate:"required"`
	DayReportUuid uuid.UUID `json:"dayReportUuid" validate:"required"`
	OwnerUuid     uuid.UUID `json:"ownerUuid" validate:"required"`
}

type UpdateJobDone struct {
	Description string `json:"description"`
	Time        int32  `json:"time"`
}

type JobDonePlainResponse struct {
	Description string            `json:"description" validate:"required"`
	Time        int32             `json:"time" validate:"required"`
	Owner       UserPlainResponse `json:"owner" validate:"required"`
}
