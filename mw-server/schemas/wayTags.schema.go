package schemas

import (
	"github.com/google/uuid"
)

type CreateWayTagPayload struct {
	Name    string    `json:"name"`
	WayUuid uuid.UUID `json:"wayUuid"`
}

type UpdateWayTagPayload struct {
	Name string `json:"name"`
}

type UpdateWayTagResponse struct {
	Name string `json:"name"`
}

type WayTagResponse struct {
	Uuid string `json:"uuid"`
	Name string `json:"name"`
}
