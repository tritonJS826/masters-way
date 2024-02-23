package schemas

import (
	"github.com/google/uuid"
)

type CreateJobTagPayload struct {
	Name        string    `json:"name" validate:"required"`
	Description string    `json:"description" validate:"required"`
	Color       string    `json:"color" validate:"required"`
	WayUuid     uuid.UUID `json:"wayUuid" validate:"required"`
}

type UpdateJobTagPayload struct {
	Name        string `json:"name"`
	Description string `json:"description"`
	Color       string `json:"color"`
}

type JobTagResponse struct {
	Uuid        string `json:"uuid" validate:"required"`
	Name        string `json:"name" validate:"required"`
	Description string `json:"description" validate:"required"`
	Color       string `json:"color" validate:"required"`
}
