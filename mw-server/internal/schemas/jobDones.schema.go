package schemas

type CreateJobDonePayload struct {
	Description       string   `json:"description" validate:"required"`
	Time              int32    `json:"time" validate:"required"`
	DayReportUuid     string   `json:"dayReportUuid" validate:"required"`
	OwnerUuid         string   `json:"ownerUuid" validate:"required"`
	JobTagUuids       []string `json:"jobTagUuids" validate:"required"`
	CompanionLanguage string   `json:"companionLanguage" example:"en|ru|ua"`
}

type UpdateJobDone struct {
	Description       *string `json:"description" example:"en|ru|ua"`
	Time              *int32  `json:"time"`
	CompanionLanguage *string `json:"companionLanguage"`
}

type JobDonePopulatedResponse struct {
	Uuid          string           `json:"uuid" validate:"required"`
	CreatedAt     string           `json:"createdAt" validate:"required"`
	UpdatedAt     string           `json:"updatedAt" validate:"required"`
	Description   string           `json:"description" validate:"required"`
	Time          int32            `json:"time" validate:"required"`
	OwnerUuid     string           `json:"ownerUuid" validate:"required"`
	OwnerName     string           `json:"ownerName" validate:"required"`
	DayReportUuid string           `json:"dayReportUuid" validate:"required"`
	WayUUID       string           `json:"wayUuid" validate:"required"`
	WayName       string           `json:"wayName" validate:"required"`
	Tags          []JobTagResponse `json:"tags" validate:"required"`
}
