package schemas

import (
	"github.com/google/uuid"
)

type CreatePlanJobTagPayload struct {
	PlanUuid   uuid.UUID `json:"planUuid" validate:"required"`
	JobTagUuid uuid.UUID `json:"jobTagUuid" validate:"required"`
}
