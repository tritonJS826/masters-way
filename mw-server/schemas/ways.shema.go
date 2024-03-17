package schemas

import (
	"github.com/google/uuid"
)

type CreateWay struct {
	Name              string    `json:"name" validate:"required"`
	GoalDescription   string    `json:"goalDescription" validate:"required"`
	EstimationTime    int32     `json:"estimationTime" validate:"required"`
	CopiedFromWayUuid string    `json:"copiedFromWayUuid" validate:"required"`
	Status            string    `json:"status" validate:"required"`
	IsPrivate         bool      `json:"isPrivate" validate:"required"`
	OwnerUuid         uuid.UUID `json:"ownerUuid" validate:"required"`
}

type UpdateWayPayload struct {
	Name            string `json:"name"`
	GoalDescription string `json:"goalDescription"`
	EstimationTime  int32  `json:"estimationTime"`
	IsPrivate       bool   `json:"isPrivate"`
	Status          string `json:"status"`
}

type WayPlainResponse struct {
	Uuid              string              `json:"uuid" validate:"required"`
	Name              string              `json:"name" validate:"required"`
	GoalDescription   string              `json:"goalDescription" validate:"required"`
	UpdatedAt         string              `json:"updatedAt" validate:"required"`
	CreatedAt         string              `json:"createdAt" validate:"required"`
	EstimationTime    int32               `json:"estimationTime" validate:"required"`
	Status            string              `json:"status" validate:"required"`
	Owner             UserPlainResponse   `json:"owner" validate:"required"`
	CopiedFromWayUuid string              `json:"copiedFromWayUuid" validate:"required" extensions:"x-nullable"`
	IsPrivate         bool                `json:"isPrivate" validate:"required"`
	FavoriteForUsers  int32               `json:"favoriteForUsers" validate:"required"`
	DayReportsAmount  int32               `json:"dayReportsAmount" validate:"required"`
	Mentors           []UserPlainResponse `json:"mentors" validate:"required"`
	WayTags           []WayTagResponse    `json:"wayTags" validate:"required"`
}

type WayPopulatedResponse struct {
	Uuid                   string                       `json:"uuid" validate:"required"`
	Name                   string                       `json:"name" validate:"required"`
	GoalDescription        string                       `json:"goalDescription" validate:"required"`
	UpdatedAt              string                       `json:"updatedAt" validate:"required"`
	CreatedAt              string                       `json:"createdAt" validate:"required"`
	EstimationTime         int32                        `json:"estimationTime" validate:"required"`
	Status                 string                       `json:"status" validate:"required"`
	IsPrivate              bool                         `json:"isPrivate" validate:"required"`
	Owner                  UserPlainResponse            `json:"owner" validate:"required"`
	DayReports             []DayReportPopulatedResponse `json:"dayReports" validate:"required"`
	Mentors                []UserPlainResponse          `json:"mentors" validate:"required"`
	FormerMentors          []UserPlainResponse          `json:"formerMentors" validate:"required"`
	FromUserMentorRequests []UserPlainResponse          `json:"mentorRequests" validate:"required"`
	FavoriteForUserUuids   int32                        `json:"favoriteForUsers" validate:"required"`
	WayTags                []WayTagResponse             `json:"wayTags" validate:"required"`
	JobTags                []JobTagResponse             `json:"jobTags" validate:"required"`
	Metrics                []MetricResponse             `json:"metrics" validate:"required"`
	CopiedFromWayUuid      string                       `json:"copiedFromWayUuid" validate:"required" extensions:"x-nullable"`
}

type GetAllWaysResponse struct {
	Size int32              `json:"size" validate:"required"`
	Ways []WayPlainResponse `json:"ways" validate:"required"`
}
