package schemas

type QuestionResult struct {
	UUID                string `json:"uuid" validate:"required"`
	QuestionUUID        string `json:"questionUuid" validate:"required"`
	UserUUID            string `json:"userUuid" validate:"required"`
	IsOk                bool   `json:"isOk" validate:"required"`
	ResultDescription   string `json:"resultDescription" validate:"required"`
	QuestionName        string `json:"questionName" validate:"required"`
	QuestionDescription string `json:"questionDescription" validate:"required"`
	UserAnswer          string `json:"userAnswer" validate:"required"`
	QuestionAnswer      string `json:"questionAnswer" validate:"required"`
}

type CreateQuestionResultRequest struct {
	QuestionUUID      string `json:"questionUuid" validate:"required"`
	UserUUID          string `json:"userUuid" validate:"required"`
	UserAnswer        string `json:"userAnswer" validate:"required"`
	TestUUID          string `json:"testUuid" validate:"required"`
	TestSessionUUID   string `json:"testSessionUuid" validate:"required"`
	IsOk              bool   `json:"isOk" validate:"required"`
	ResultDescription string `json:"resultDescription" validate:"required"`
}

type GetQuestionResultsBySessionUuidRequest struct {
	SessionUUID string `json:"sessionUuid" validate:"required"`
	UserUUID    string `json:"userUuid" validate:"required"`
}

type GetQuestionResultsBySessionUuidResponse struct {
	Results []QuestionResult `json:"results" validate:"required"`
}
