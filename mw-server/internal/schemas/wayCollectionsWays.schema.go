package schemas

type CreateWayCollectionWay struct {
	WayCollectionUuid string `json:"wayCollectionUuid" validate:"required"`
	WayUuid           string `json:"wayUuid" validate:"required"`
}

type WayCollectionWayResponse struct {
	WayCollectionID string `json:"wayCollectionId" validate:"required"`
	WayID           string `json:"wayId" validate:"required"`
}
