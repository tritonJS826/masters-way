package schemas

type CreateSessionRequest struct {
	UserUUID string `json:"user_uuid" validate:"required"`
}

type TestSession struct {
	SessionUUID string `json:"session_uuid" validate:"required"`
}
