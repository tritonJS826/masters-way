package schemas

import (
	"github.com/google/uuid"
)

type CreateCommentPayload struct {
	Description   string    `json:"description"`
	DayReportUuid uuid.UUID `json:"dayReportUuid"`
	OwnerUuid     uuid.UUID `json:"ownerUuid"`
}

type UpdateCommentPayload struct {
	Description string `json:"description"`
}

type CommentPlainResponse struct {
	Description string            `json:"description"`
	Owner       UserPlainResponse `json:"owner"`
}
