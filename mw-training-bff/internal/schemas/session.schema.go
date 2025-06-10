package schemas

type CreateSessionRequest struct {
	UserUUID string `json:"userUuid" validate:"required"`
}

type TestSession struct {
	SessionUUID string `json:"sessionUuid" validate:"required"`
}
