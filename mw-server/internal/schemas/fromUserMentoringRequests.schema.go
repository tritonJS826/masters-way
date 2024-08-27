package schemas

type CreateFromUserMentoringRequestPayload struct {
	UserUuid string `json:"userUuid" validate:"required"`
	WayUuid  string `json:"wayUuid" validate:"required"`
}

type FromUserMentoringRequestResponse struct {
	UserID string `json:"userId" validate:"required"`
	WayID  string `json:"wayId" validate:"required"`
}
