package schemas

import "time"

type CreateWayCollectionPayload struct {
	Name      string `json:"name"`
	OwnerUuid string `json:"ownerUuid"`
}

type UpdateWayCollectionPayload struct {
	Name string `json:"name"`
}

type WayCollectionPopulatedResponse struct {
	Uuid      string             `json:"uuid"`
	Name      string             `json:"name"`
	Ways      []WayPlainResponse `json:"ways"`
	CreatedAt time.Time          `json:"createdAt"`
	UpdatedAt time.Time          `json:"updatedAt"`
	OwnerUuid string             `json:"ownerUuid"`
}

type WayCollectionPlainResponse struct {
	Uuid string `json:"uuid"`
	Name string `json:"name"`
}
