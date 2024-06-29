package schemas

import (
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
	CreatedAt string                     `json:"createdAt" validate:"required"`
	UpdatedAt string                     `json:"updatedAt" validate:"required"`
	IsDayOff  bool                       `json:"isDayOff" validate:"required"`
	JobsDone  []JobDonePopulatedResponse `json:"jobsDone" validate:"required"`
	Plans     []PlanPopulatedResponse    `json:"plans" validate:"required"`
	Problems  []ProblemPopulatedResponse `json:"problems" validate:"required"`
	Comments  []CommentPopulatedResponse `json:"comments" validate:"required"`
}

type DayReportPopulatedDTO struct {
	Uuid      uuid.UUID `json:"uuid"`
	WayUuid   uuid.UUID `json:"way_uuid"`
	CreatedAt string    `json:"created_at"`
	UpdatedAt string    `json:"updated_at"`
	IsDayOff  bool      `json:"is_day_off"`
}
