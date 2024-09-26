package schemas

type CreateDayReportPayload struct {
	WayID string `json:"wayId" validate:"required"`
}

type DayReportsCompositionParticipants struct {
	DayReportID string `json:"dayReportId" validate:"required"`
	WayID       string `json:"wayId" validate:"required"`
	WayName     string `json:"wayName" validate:"required"`
}

type CompositeDayReportPopulatedResponse struct {
	// Always generated
	UUID string `json:"uuid" validate:"required"`
	// Calculated by - just date
	CreatedAt string `json:"createdAt" validate:"required"`
	// Calculated by - just last date
	UpdatedAt               string                              `json:"updatedAt" validate:"required"`
	CompositionParticipants []DayReportsCompositionParticipants `json:"compositionParticipants" validate:"required"`

	JobsDone []JobDonePopulatedResponse `json:"jobsDone" validate:"required"`
	Plans    []PlanPopulatedResponse    `json:"plans" validate:"required"`
	Problems []ProblemPopulatedResponse `json:"problems" validate:"required"`
	Comments []CommentPopulatedResponse `json:"comments" validate:"required"`
}

type ListDayReportsResponse struct {
	DayReports []CompositeDayReportPopulatedResponse `json:"dayReports" validate:"required"`
	Size       int                                   `json:"size" validate:"required"`
}
