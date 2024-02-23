package schemas

import (
	"github.com/google/uuid"
)

type CreateFavoriteUserWayPayload struct {
	WayUuid  uuid.UUID `json:"wayUuid" validate:"required"`
	UserUuid uuid.UUID `json:"userUuid" validate:"required"`
}
