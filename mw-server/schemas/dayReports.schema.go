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
	WayUuid   string                     `json:"wayUuid" validate:"required"`
	CreatedAt string                     `json:"createdAt" validate:"required"`
	UpdatedAt string                     `json:"updatedAt" validate:"required"`
	JobsDone  []JobDonePopulatedResponse `json:"jobsDone" validate:"required"`
	Plans     []PlanPopulatedResponse    `json:"plans" validate:"required"`
	Problems  []ProblemPopulatedResponse `json:"problems" validate:"required"`
	Comments  []CommentPopulatedResponse `json:"comments" validate:"required"`
}

type DayReportsCompositionParticipants struct {
	DayReportID string `json:"dayReportId" validate:"required"`
	WayID       string `json:"wayId" validate:"required"`
	WayName     string `json:"wayName" validate:"required"`
}

// CompositDayReport schema
// Job -> add wayId, wayName
// tag -> label
// remove isDayOff (from db)
type CompositeDayReportPopulatedResponse struct {
	// Always generated
	UUID string `json:"uuid" validate:"required"`
	// Calculated by - just date
	CreatedAt string `json:"createdAt" validate:"required"`
	// Calculated by - just last date
	UpdatedAt               string `json:"updatedAt" validate:"required"`
	CompositionParticipants []DayReportsCompositionParticipants

	JobsDone []JobDonePopulatedResponse `json:"jobsDone" validate:"required"`
	Plans    []PlanPopulatedResponse    `json:"plans" validate:"required"`
	Problems []ProblemPopulatedResponse `json:"problems" validate:"required"`
	Comments []CommentPopulatedResponse `json:"comments" validate:"required"`
}

type ListDayReportsResponse struct {
	DayReports []CompositeDayReportPopulatedResponse `json:"dayReports" validate:"required"`
	Size       int                                   `json:"size" validate:"required"`
}
