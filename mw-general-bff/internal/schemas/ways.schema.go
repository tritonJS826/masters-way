package schemas

type CreateWayPayload struct {
	Name            string  `json:"name" validate:"required"`
	GoalDescription string  `json:"goalDescription" validate:"required"`
	OwnerID         string  `json:"ownerId" validate:"required"`
	CopiedFromWayID *string `json:"copiedFromWayId" validate:"required" extensions:"x-nullable"`
	ProjectID       *string `json:"projectId" validate:"required" extensions:"x-nullable"`
	EstimationTime  int32   `json:"estimationTime" validate:"required"`
	IsCompleted     bool    `json:"isCompleted" validate:"required"`
	IsPrivate       bool    `json:"isPrivate" validate:"required"`
}

type UpdateWayPayload struct {
	Name            string `json:"name"`
	GoalDescription string `json:"goalDescription"`
	EstimationTime  int32  `json:"estimationTime"`
	IsPrivate       *bool  `json:"isPrivate"`
	IsCompleted     bool   `json:"isCompleted"`
}

type WayPlainResponse struct {
	Uuid              string              `json:"uuid" validate:"required"`
	Name              string              `json:"name" validate:"required"`
	GoalDescription   string              `json:"goalDescription" validate:"required"`
	UpdatedAt         string              `json:"updatedAt" validate:"required"`
	CreatedAt         string              `json:"createdAt" validate:"required"`
	EstimationTime    int32               `json:"estimationTime" validate:"required"`
	IsCompleted       bool                `json:"isCompleted" validate:"required"`
	Owner             UserPlainResponse   `json:"owner" validate:"required"`
	CopiedFromWayUuid *string             `json:"copiedFromWayUuid" validate:"required" extensions:"x-nullable"`
	ProjectUuid       *string             `json:"projectUuid" validate:"required" extensions:"x-nullable"`
	IsPrivate         bool                `json:"isPrivate" validate:"required"`
	FavoriteForUsers  int32               `json:"favoriteForUsers" validate:"required"`
	DayReportsAmount  int32               `json:"dayReportsAmount" validate:"required"`
	Mentors           []UserPlainResponse `json:"mentors" validate:"required"`
	WayTags           []WayTagResponse    `json:"wayTags" validate:"required"`
	MetricsDone       int32               `json:"metricsDone" validate:"required"`
	MetricsTotal      int32               `json:"metricsTotal" validate:"required"`
	ChildrenUuids     []string            `json:"childrenUuids" validate:"required"`
}

type WayPopulatedResponse struct {
	Uuid                   string                 `json:"uuid" validate:"required"`
	Name                   string                 `json:"name" validate:"required"`
	GoalDescription        string                 `json:"goalDescription" validate:"required"`
	UpdatedAt              string                 `json:"updatedAt" validate:"required"`
	CreatedAt              string                 `json:"createdAt" validate:"required"`
	EstimationTime         int32                  `json:"estimationTime" validate:"required"`
	IsCompleted            bool                   `json:"isCompleted" validate:"required"`
	IsPrivate              bool                   `json:"isPrivate" validate:"required"`
	Owner                  UserPlainResponse      `json:"owner" validate:"required"`
	Mentors                []UserPlainResponse    `json:"mentors" validate:"required"`
	FormerMentors          []UserPlainResponse    `json:"formerMentors" validate:"required"`
	FromUserMentorRequests []UserPlainResponse    `json:"mentorRequests" validate:"required"`
	FavoriteForUsersAmount int32                  `json:"favoriteForUsersAmount" validate:"required"`
	WayTags                []WayTagResponse       `json:"wayTags" validate:"required"`
	JobTags                []JobTagResponse       `json:"jobTags" validate:"required"`
	Metrics                []MetricResponse       `json:"metrics" validate:"required"`
	CopiedFromWayUuid      *string                `json:"copiedFromWayUuid" validate:"required" extensions:"x-nullable"`
	ProjectUuid            *string                `json:"projectUuid" validate:"required" extensions:"x-nullable"`
	Children               []WayPopulatedResponse `json:"children" validate:"required"`
}

type GetAllWaysResponse struct {
	Size int32              `json:"size" validate:"required"`
	Ways []WayPlainResponse `json:"ways" validate:"required"`
}

type WayStatistics struct {
	TimeSpentByDayChart []TimeSpentByDayPoint `json:"timeSpentByDayChart" validate:"required"`
	OverallInformation  OverallInformation    `json:"overallInformation" validate:"required"`
	LabelStatistics     LabelStatistics       `json:"labelStatistics" validate:"required"`
}

type WayStatisticsTriplePeriod struct {
	TotalTime WayStatistics `json:"totalTime" validate:"required"`
	LastMonth WayStatistics `json:"lastMonth" validate:"required"`
	LastWeek  WayStatistics `json:"lastWeek" validate:"required"`
}

type Label struct {
	ID          string `json:"uuid" validate:"required"`
	Name        string `json:"name" validate:"required"`
	Color       string `json:"color" validate:"required"`
	Description string `json:"description" validate:"required"`
}

type LabelInfo struct {
	Label                Label `json:"label" validate:"required"`
	JobsAmount           int   `json:"jobsAmount" validate:"required"`
	JobsAmountPercentage int   `json:"jobsAmountPercentage" validate:"required"`
	Time                 int   `json:"time" validate:"required"`
	TimePercentage       int   `json:"timePercentage" validate:"required"`
}

type LabelStatistics struct {
	Labels []LabelInfo `json:"labels" validate:"required"`
}

type OverallInformation struct {
	TotalTime                 int `json:"totalTime" validate:"required"`
	TotalReports              int `json:"totalReports" validate:"required"`
	FinishedJobs              int `json:"finishedJobs" validate:"required"`
	AverageTimePerCalendarDay int `json:"averageTimePerCalendarDay" validate:"required"`
	AverageTimePerWorkingDay  int `json:"averageTimePerWorkingDay" validate:"required"`
	AverageJobTime            int `json:"averageJobTime" validate:"required"`
}

type TimeSpentByDayPoint struct {
	Value int    `json:"value" validate:"required"`
	Date  string `json:"date" validate:"required"`
}
