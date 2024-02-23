package schemas

import (
	"github.com/google/uuid"
)

type CreatePlanJobTagPayload struct {
	PlanUuid   uuid.UUID `json:"planUuid"`
	JobTagUuid uuid.UUID `json:"jobTagUuid"`
}
