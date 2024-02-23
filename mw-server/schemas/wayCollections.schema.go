package schemas

import "time"

type CreateWayCollectionPayload struct {
	Name      string `json:"name" validate:"required"`
	OwnerUuid string `json:"ownerUuid" validate:"required"`
}

type UpdateWayCollectionPayload struct {
	Name string `json:"name"`
}

type WayCollectionPopulatedResponse struct {
	Uuid      string             `json:"uuid" validate:"required"`
	Name      string             `json:"name" validate:"required"`
	Ways      []WayPlainResponse `json:"ways" validate:"required"`
	CreatedAt time.Time          `json:"createdAt" validate:"required"`
	UpdatedAt time.Time          `json:"updatedAt" validate:"required"`
	OwnerUuid string             `json:"ownerUuid" validate:"required"`
}

type WayCollectionPlainResponse struct {
	Uuid string `json:"uuid" validate:"required"`
	Name string `json:"name" validate:"required"`
}
