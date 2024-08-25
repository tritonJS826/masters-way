package schemas

type CreateUserMentoringRequestPayload struct {
	UserUuid string `json:"userUuid" validate:"required"`
	WayUuid  string `json:"wayUuid" validate:"required"`
}
