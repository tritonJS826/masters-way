package schemas

type CreateMentorUserWayPayload struct {
	UserUuid string `json:"userUuid" validate:"required"`
	WayUuid  string `json:"wayUuid" validate:"required"`
}

type DeleteMentorUserWayPayload struct {
	UserUuid string `json:"userUuid" validate:"required"`
	WayUuid  string `json:"wayUuid" validate:"required"`
}
