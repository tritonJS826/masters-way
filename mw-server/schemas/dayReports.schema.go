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

type DayReportPopulatedResponse struct {
	Uuid      string                     `json:"uuid" validate:"required"`
	CreatedAt time.Time                  `json:"createdAt" validate:"required"`
	UpdatedAt time.Time                  `json:"updatedAt" validate:"required"`
	IsDayOff  bool                       `json:"isDayOff" validate:"required"`
	JobsDone  []JobDonePopulatedResponse `json:"jobsDone" validate:"required"`
	Plans     []PlanPopulatedResponse    `json:"plans" validate:"required"`
	Problems  []ProblemPopulatedResponse `json:"problems" validate:"required"`
	Comments  []CommentPopulatedResponse `json:"comments" validate:"required"`
}
