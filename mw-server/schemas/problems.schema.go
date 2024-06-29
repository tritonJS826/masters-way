package schemas

import "github.com/google/uuid"

type CreateProblemPayload struct {
	Description   string `json:"description" validate:"required"`
	IsDone        bool   `json:"isDone" validate:"required"`
	OwnerUuid     string `json:"ownerUuid" validate:"required"`
	DayReportUuid string `json:"dayReportUuid" validate:"required"`
}

type UpdateProblemPayload struct {
	Description string `json:"description"`
	IsDone      bool   `json:"isDone"`
}

type ProblemPopulatedResponse struct {
	Uuid          string           `json:"uuid" validate:"required"`
	CreatedAt     string           `json:"createdAt" validate:"required"`
	UpdatedAt     string           `json:"updatedAt" validate:"required"`
	Description   string           `json:"description" validate:"required"`
	IsDone        bool             `json:"isDone" validate:"required"`
	OwnerUuid     string           `json:"ownerUuid" validate:"required"`
	OwnerName     string           `json:"ownerName" validate:"required"`
	DayReportUuid string           `json:"dayReportUuid" validate:"required"`
	Tags          []JobTagResponse `json:"tags" validate:"required"`
}

type ProblemPopulatedDTO struct {
	Uuid          uuid.UUID `json:"uuid"`
	CreatedAt     string    `json:"created_at"`
	UpdatedAt     string    `json:"updated_at"`
	Description   string    `json:"description"`
	IsDone        bool      `json:"is_done"`
	OwnerUuid     uuid.UUID `json:"owner_uuid"`
	DayReportUuid uuid.UUID `json:"day_report_uuid"`
	TagUuids      []string  `json:"tag_uuids"`
}
