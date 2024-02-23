package schemas

import (
	"github.com/google/uuid"
)

type CreateFavoriteUserWayPayload struct {
	WayUuid  uuid.UUID `json:"wayUuid"`
	UserUuid uuid.UUID `json:"userUuid"`
}
