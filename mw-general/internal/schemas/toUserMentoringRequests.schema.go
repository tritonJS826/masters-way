package schemas

type CreateToUserMentoringRequestPayload struct {
	UserUuid string `json:"userUuid" validate:"required"`
	WayUuid  string `json:"wayUuid" validate:"required"`
}

type ToUserMentoringRequestResponse struct {
	UserID string `json:"userId" validate:"required"`
	WayID  string `json:"wayId" validate:"required"`
}
