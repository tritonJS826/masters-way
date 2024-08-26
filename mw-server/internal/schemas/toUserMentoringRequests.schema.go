package schemas

type CreateToUserMentoringRequestPayload struct {
	UserUuid string `json:"userUuid" validate:"required"`
	WayUuid  string `json:"wayUuid" validate:"required"`
}

type ToUserMentoringRequestResponse struct {
	UserID string `json:"userID" validate:"required"`
	WayID  string `json:"wayID" validate:"required"`
}
