package schemas

import (
	"time"

	"github.com/google/uuid"
)

type CreateDayReportPayload struct {
	WayUuid  uuid.UUID `json:"wayUuid" validate:"required"`
	IsDayOff bool      `json:"isDayOff" validate:"required"`
}

type UpdateDayReportPayload struct {
	IsDayOff bool `json:"isDayOff"`
}

type DayReportPlainResponse struct {
	CreatedAt time.Time              `json:"createdAt" validate:"required"`
	UpdatedAt time.Time              `json:"updatedAt" validate:"required"`
	IsDayOff  bool                   `json:"isDayOff" validate:"required"`
	JobsDone  []JobDonePlainResponse `json:"jobsDone" validate:"required"`
	Plans     []PlanPlainResponse    `json:"plans" validate:"required"`
	Problems  []ProblemPlainResponse `json:"problems" validate:"required"`
	Comments  []CommentPlainResponse `json:"comments" validate:"required"`
}
