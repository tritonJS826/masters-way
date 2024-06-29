package schemas

import "github.com/google/uuid"

type CreateCommentPayload struct {
	Description   string `json:"description" validate:"required"`
	DayReportUuid string `json:"dayReportUuid" validate:"required"`
	OwnerUuid     string `json:"ownerUuid" validate:"required"`
}

type UpdateCommentPayload struct {
	Description string `json:"description"`
}

type CommentPopulatedResponse struct {
	Uuid          string `json:"uuid" validate:"required"`
	Description   string `json:"description" validate:"required"`
	OwnerUuid     string `json:"ownerUuid" validate:"required"`
	OwnerName     string `json:"ownerName" validate:"required"`
	CreatedAt     string `json:"createdAt" validate:"required"`
	UpdatedAt     string `json:"updatedAt" validate:"required"`
	DayReportUuid string `json:"dayReportUuid" validate:"required"`
}

type CommentPopulatedDTO struct {
	Uuid          uuid.UUID `json:"uuid"`
	CreatedAt     string    `json:"created_at"`
	UpdatedAt     string    `json:"updated_at"`
	Description   string    `json:"description"`
	OwnerUuid     uuid.UUID `json:"owner_uuid"`
	DayReportUuid uuid.UUID `json:"day_report_uuid"`
}
