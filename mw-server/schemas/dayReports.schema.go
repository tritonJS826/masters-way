package schemas

import (
	"time"

	"github.com/google/uuid"
)

type CreateDayReportPayload struct {
	WayUuid  uuid.UUID `json:"wayUuid"`
	IsDayOff bool      `json:"isDayOff"`
}

type UpdateDayReportPayload struct {
	IsDayOff bool `json:"isDayOff"`
}

type DayReportPlainResponse struct {
	CreatedAt time.Time              `json:"createdAt"`
	UpdatedAt time.Time              `json:"updatedAt"`
	IsDayOff  bool                   `json:"isDayOff"`
	JobsDone  []JobDonePlainResponse `json:"jobsDone"`
	Plans     []PlanPlainResponse    `json:"plans"`
	Problems  []ProblemPlainResponse `json:"problems"`
	Comments  []CommentPlainResponse `json:"comments"`
}
