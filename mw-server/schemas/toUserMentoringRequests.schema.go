package schemas

import (
	"github.com/google/uuid"
)

type CreateUserMentoringRequestPayload struct {
	UserUuid uuid.UUID `json:"userUuid"`
	WayUuid  uuid.UUID `json:"wayUuid"`
}
