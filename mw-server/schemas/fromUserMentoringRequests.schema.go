package schemas

import (
	"github.com/google/uuid"
)

type CreateFromUserMentoringRequestPayload struct {
	UserUuid uuid.UUID `json:"userUuid"`
	WayUuid  uuid.UUID `json:"wayUuid"`
}
