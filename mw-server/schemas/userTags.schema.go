package schemas

import (
	"github.com/google/uuid"
)

type CreateUserTagPayload struct {
	Name      string    `json:"name" validate:"required"`
	OwnerUuid uuid.UUID `json:"ownerUuid" validate:"required"`
}

type UpdateUserTagPayload struct {
	Name string `json:"name"`
}

type UserTagResponse struct {
	Uuid string `json:"uuid" validate:"required"`
	Name string `json:"name" validate:"required"`
}
