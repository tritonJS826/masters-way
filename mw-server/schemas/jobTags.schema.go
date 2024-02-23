package schemas

import (
	"github.com/google/uuid"
)

type CreateJobTagPayload struct {
	Name        string    `json:"name"`
	Description string    `json:"description"`
	Color       string    `json:"color"`
	WayUuid     uuid.UUID `json:"wayUuid"`
}

type UpdateJobTagPayload struct {
	Name        string `json:"name"`
	Description string `json:"description"`
	Color       string `json:"color"`
}

type JobTagResponse struct {
	Uuid        string `json:"uuid"`
	Name        string `json:"name"`
	Description string `json:"description"`
	Color       string `json:"color"`
}
