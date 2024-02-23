package schemas

import (
	"github.com/google/uuid"
)

type CreateUserTagPayload struct {
	Name      string    `json:"name"`
	OwnerUuid uuid.UUID `json:"ownerUuid"`
}

type UpdateUserTagPayload struct {
	Name string `json:"name"`
}

type UserTagResponse struct {
	Uuid string `json:"uuid"`
	Name string `json:"name"`
}
