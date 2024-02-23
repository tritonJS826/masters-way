package schemas

import (
	"github.com/google/uuid"
)

type CreateUserMentoringRequestPayload struct {
	UserUuid uuid.UUID `json:"userUuid" validate:"required"`
	WayUuid  uuid.UUID `json:"wayUuid" validate:"required"`
}
