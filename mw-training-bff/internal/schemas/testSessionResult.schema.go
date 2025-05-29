package schemas

type GetTestSessionResultRequest struct {
	SessionUUID string `json:"session_uuid" validate:"required"`
}

type GetTestSessionResultResponse struct {
	SessionUUID       string `json:"session_uuid" validate:"required"`
	TestUUID          string `json:"test_uuid" validate:"required"`
	ResultDescription string `json:"result_description" validate:"required"`
	CreatedAt         string `json:"created_at" validate:"required"`
}
