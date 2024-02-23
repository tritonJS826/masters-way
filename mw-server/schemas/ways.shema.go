package schemas

import (
	"time"

	"github.com/google/uuid"
)

type CreateWay struct {
	Name            string `json:"name"`
	GoalDescription string `json:"goalDescription"`
	//TODO estimationTime's type int 32?
	EstimationTime    int64     `json:"estimationTime"`
	CopiedFromWayUuid string    `json:"copiedFromWayUuid"`
	Status            string    `json:"status"`
	OwnerUuid         uuid.UUID `json:"ownerUuid"`
}

type UpdateWayPayload struct {
	Name            string `json:"name"`
	GoalDescription string `json:"goalDescription"`
	//TODO estimationTime's type int 32?
	EstimationTime int64  `json:"estimationTime"`
	Status         string `json:"status"`
}

type WayPlainResponse struct {
	Name              string    `json:"name"`
	GoalDescription   string    `json:"goalDescription"`
	UpdatedAt         time.Time `json:"lastUpdate"`
	CreatedAt         time.Time `json:"createdAt"`
	EstimationTime    int32     `json:"estimationTime"`
	Status            string    `json:"status"`
	OwnerUuid         uuid.UUID `json:"ownerUuid"`
	CopiedFromWayUuid *string   `json:"copied_from_way_uuid"`
}

type WayPopulatedResponse struct {
	Name                 string                   `json:"name"`
	GoalDescription      string                   `json:"goalDescription"`
	UpdatedAt            time.Time                `json:"lastUpdate"`
	CreatedAt            time.Time                `json:"createdAt"`
	EstimationTime       int32                    `json:"estimationTime"`
	Status               string                   `json:"status"`
	Owner                UserPlainResponse        `json:"owner"`
	CopiedFromWayUuid    *string                  `json:"copiedFromWayUuid"`
	DayReports           []DayReportPlainResponse `json:"dayReports"`
	Mentors              []UserPlainResponse      `json:"mentors"`
	FormerMentors        []UserPlainResponse      `json:"formerMentors"`
	MentorRequests       []UserPlainResponse      `json:"mentorRequests"`
	FavoriteForUserUuids []string                 `json:"favoriteForUsers"`
	WayTags              []WayTagResponse         `json:"wayTags"`
	JobTags              []JobTagResponse         `json:"jobTags"`
	Metrics              []MetricResponse         `json:"metrics"`
}

//TODO: add to UpdateWayPayload properties updatedAt?
