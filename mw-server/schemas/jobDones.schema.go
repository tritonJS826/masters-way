package schemas

import "github.com/google/uuid"

type CreateJobDonePayload struct {
	Description   string   `json:"description" validate:"required"`
	Time          int32    `json:"time" validate:"required"`
	DayReportUuid string   `json:"dayReportUuid" validate:"required"`
	OwnerUuid     string   `json:"ownerUuid" validate:"required"`
	JobTagUuids   []string `json:"jobTagUuids" validate:"required"`
}

type UpdateJobDone struct {
	Description string `json:"description"`
	Time        int32  `json:"time"`
}

type JobDonePopulatedResponse struct {
	Uuid          string           `json:"uuid" validate:"required"`
	CreatedAt     string           `json:"createdAt" validate:"required"`
	UpdatedAt     string           `json:"updatedAt" validate:"required"`
	Description   string           `json:"description" validate:"required"`
	Time          int32            `json:"time" validate:"required"`
	OwnerUuid     string           `json:"ownerUuid" validate:"required"`
	OwnerName     string           `json:"ownerName" validate:"required"`
	DayReportUuid string           `json:"dayReportUuid" validate:"required"`
	Tags          []JobTagResponse `json:"tags" validate:"required"`
}

type JobDonePopulatedDTO struct {
	Uuid          uuid.UUID `json:"uuid"`
	CreatedAt     string    `json:"created_at"`
	UpdatedAt     string    `json:"updated_at"`
	Description   string    `json:"description"`
	Time          int32     `json:"time"`
	OwnerUuid     uuid.UUID `json:"owner_uuid"`
	DayReportUuid uuid.UUID `json:"day_report_uuid"`
	TagUuids      []string  `json:"tag_uuids"`
}
