package schemas

import (
	"github.com/google/uuid"
	"time"
)

type GetMentorRequestPayload struct {
	UserUUID uuid.UUID `json:"userUuid"`
}

type GetMentorRequestResponse struct {
	UserUuid          uuid.UUID `json:"user_uuid"`
	WayUuid           uuid.UUID `json:"way_uuid"`
	Uuid              uuid.UUID `json:"uuid"`
	Name              string    `json:"name"`
	GoalDescription   string    `json:"goal_description"`
	UpdatedAt         time.Time `json:"updated_at"`
	CreatedAt         time.Time `json:"created_at"`
	EstimationTime    int32     `json:"estimation_time"`
	OwnerUuid         uuid.UUID `json:"owner_uuid"`
	CopiedFromWayUuid uuid.UUID `json:"copied_from_way_uuid"`
	IsCompleted       bool      `json:"is_completed"`
	IsPrivate         bool      `json:"is_private"`
}
