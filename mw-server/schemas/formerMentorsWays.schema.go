package schemas

import (
	"github.com/google/uuid"
)

type CreateFormerMentorWayPayload struct {
	WayUuid          uuid.UUID `json:"wayUuid" validate:"required"`
	FormerMentorUuid uuid.UUID `json:"formerMentorUuid" validate:"required"`
}
