package schemas

import (
	db "mwserver/db/sqlc"
)

type CreateJobDonePayload struct {
	Description   string `json:"description" validate:"required"`
	Time          int32  `json:"time" validate:"required"`
	DayReportUuid string `json:"dayReportUuid" validate:"required"`
	OwnerUuid     string `json:"ownerUuid" validate:"required"`
}

type UpdateJobDone struct {
	Description string `json:"description"`
	Time        int32  `json:"time"`
}

type JobDonePopulatedResponse struct {
	Uuid          string      `json:"uuid" validate:"required"`
	CreatedAt     string      `json:"createdAt" validate:"required"`
	UpdatedAt     string      `json:"updatedAt" validate:"required"`
	Description   string      `json:"description" validate:"required"`
	Time          int32       `json:"time" validate:"required"`
	OwnerUuid     string      `json:"name" validate:"required"`
	OwnerName     string      `json:"ownerName" validate:"required"`
	DayReportUuid string      `json:"dayReportUuid" validate:"required"`
	Tags          []db.JobTag `json:"tags" validate:"required"`
}
