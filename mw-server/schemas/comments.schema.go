package schemas

import (
	"github.com/google/uuid"
)

type CreateCommentPayload struct {
	Description   string    `json:"description" validate:"required"`
	DayReportUuid uuid.UUID `json:"dayReportUuid" validate:"required"`
	OwnerUuid     uuid.UUID `json:"ownerUuid" validate:"required"`
}

type UpdateCommentPayload struct {
	Description string `json:"description"`
}

type CommentPlainResponse struct {
	Description string            `json:"description" validate:"required"`
	Owner       UserPlainResponse `json:"owner" validate:"required"`
}
