package schemas

type CreateWayCollectionWay struct {
	WayCollectionUuid string `json:"wayCollectionUuid" validate:"required"`
	WayUuid           string `json:"wayUuid" validate:"required"`
}
