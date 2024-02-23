package schemas

import (
	"github.com/google/uuid"
)

type CreateFormerMentorWayPayload struct {
	WayUuid          uuid.UUID `json:"wayUuid"`
	FormerMentorUuid uuid.UUID `json:"formerMentorUuid"`
}
