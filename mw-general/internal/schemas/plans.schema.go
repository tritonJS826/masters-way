package schemas

type CreatePlanPayload struct {
	Description   string `json:"description" validate:"required"`
	Time          int32  `json:"time" validate:"required"`
	IsDone        bool   `json:"isDone" validate:"required"`
	OwnerUuid     string `json:"ownerUuid" validate:"required"`
	DayReportUuid string `json:"dayReportUuid" validate:"required"`
}

type UpdatePlanPayload struct {
	Description *string `json:"description"`
	Time        *int32  `json:"time"`
	IsDone      *bool   `json:"isDone"`
}

type PlanPopulatedResponse struct {
	Uuid          string           `json:"uuid" validate:"required"`
	CreatedAt     string           `json:"createdAt" validate:"required"`
	UpdatedAt     string           `json:"updatedAt" validate:"required"`
	Description   string           `json:"description" validate:"required"`
	Time          int32            `json:"time" validate:"required"`
	OwnerUuid     string           `json:"ownerUuid" validate:"required"`
	OwnerName     string           `json:"ownerName" validate:"required"`
	IsDone        bool             `json:"isDone" validate:"required"`
	DayReportUuid string           `json:"dayReportUuid" validate:"required"`
	WayUUID       string           `json:"wayUuid" validate:"required"`
	WayName       string           `json:"wayName" validate:"required"`
	Tags          []JobTagResponse `json:"tags" validate:"required"`
}
