package schemas

import "time"

type CreateCommentPayload struct {
	Description   string `json:"description" validate:"required"`
	DayReportUuid string `json:"dayReportUuid" validate:"required"`
	OwnerUuid     string `json:"ownerUuid" validate:"required"`
}

type UpdateCommentPayload struct {
	Description string `json:"description"`
}

type CommentPopulatedResponse struct {
	Uuid        string            `json:"uuid" validate:"required"`
	Description string            `json:"description" validate:"required"`
	Owner       UserPlainResponse `json:"owner" validate:"required"`
	CreatedAt   time.Time         `json:"createdAt" validate:"required"`
	UpdatedAt   time.Time         `json:"updatedAt" validate:"required"`
}
