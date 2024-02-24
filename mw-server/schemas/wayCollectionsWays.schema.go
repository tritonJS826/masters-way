package schemas

type CreateWayCollectionWay struct {
	WayCollectionsUuid string `json:"wayCollectionsUuid" validate:"required"`
	WayUuid            string `json:"wayUuid" validate:"required"`
}
