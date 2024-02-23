package schemas

import (
	"github.com/google/uuid"
)

type CreateWayCollectionWay struct {
	WayCollectionsUuid uuid.UUID `json:"wayCollectionsUuid"`
	WayUuid            uuid.UUID `json:"wayUuid"`
}
