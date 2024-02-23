package schemas

import (
	"github.com/google/uuid"
)

type CreateWayCollectionWay struct {
	WayCollectionsUuid uuid.UUID `json:"wayCollectionsUuid" validate:"required"`
	WayUuid            uuid.UUID `json:"wayUuid" validate:"required"`
}
