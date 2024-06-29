package schemas

import "github.com/google/uuid"

type CreatePlanPayload struct {
	Description   string `json:"description" validate:"required"`
	Time          int32  `json:"time" validate:"required"`
	IsDone        bool   `json:"isDone" validate:"required"`
	OwnerUuid     string `json:"ownerUuid" validate:"required"`
	DayReportUuid string `json:"dayReportUuid" validate:"required"`
}

type UpdatePlanPayload struct {
	Description string `json:"description"`
	Time        int32  `json:"time"`
	IsDone      bool   `json:"isDone"`
}

type PlanPopulatedResponse struct {
	Uuid          string           `json:"uuid" validate:"required"`
	CreatedAt     string           `json:"createdAt" validate:"required"`
	UpdatedAt     string           `json:"updatedAt" validate:"required"`
	Description   string           `json:"description" validate:"required"`
	Time          int32            `json:"time" validate:"required"`
	OwnerUuid     string           `json:"ownerUuid" validate:"required"`
	OwnerName     string           `json:"ownerName" validate:"required"`
	IsDone        bool             `json:"isDone" validate:"required"`
	DayReportUuid string           `json:"dayReportUuid" validate:"required"`
	Tags          []JobTagResponse `json:"tags" validate:"required"`
}

type PlanPopulatedDTO struct {
	Uuid          uuid.UUID `json:"uuid"`
	CreatedAt     string    `json:"created_at"`
	UpdatedAt     string    `json:"updated_at"`
	Description   string    `json:"description"`
	Time          int32     `json:"time"`
	OwnerUuid     uuid.UUID `json:"owner_uuid"`
	IsDone        bool      `json:"is_done"`
	DayReportUuid uuid.UUID `json:"day_report_uuid"`
	TagUuids      []string  `json:"tag_uuids"`
}
