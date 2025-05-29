package schemas

type QuestionResult struct {
	UUID            string `json:"uuid" validate:"required"`
	QuestionUUID    string `json:"question_uuid" validate:"required"`
	UserUUID        string `json:"user_uuid" validate:"required"`
	TestUUID        string `json:"test_uuid" validate:"required"`
	TestSessionUUID string `json:"test_session_uuid" validate:"required"`
	IsOk            bool   `json:"is_ok" validate:"required"`
	ResultDesc      string `json:"result_description" validate:"required"`
	CreatedAt       string `json:"created_at" validate:"required"`
}

type CreateQuestionResultRequest struct {
	QuestionUUID      string `json:"question_uuid" validate:"required"`
	UserUUID          string `json:"user_uuid" validate:"required"`
	TestUUID          string `json:"test_uuid" validate:"required"`
	TestSessionUUID   string `json:"test_session_uuid" validate:"required"`
	IsOk              bool   `json:"is_ok" validate:"required"`
	ResultDescription string `json:"result_description" validate:"required"`
}

type GetQuestionResultsBySessionUuidRequest struct {
	SessionUUID string `json:"session_uuid" validate:"required"`
	UserUUID    string `json:"user_uuid" validate:"required"`
}

type GetQuestionResultsBySessionUuidResponse struct {
	Results []QuestionResult `json:"results" validate:"required"`
}
