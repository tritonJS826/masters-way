package schemas

type GetTestSessionResultResponse struct {
	SessionUUID       string `json:"sessionUuid" validate:"required"`
	TestUUID          string `json:"testUuid" validate:"required"`
	ResultDescription string `json:"resultDescription" validate:"required"`
	SessionResultUUID string `json:"sessionResultUUID" validate:"required"`
	CreatedAt         string `json:"createdAt" validate:"required"`
}

type CreateSessionResultRequest struct {
	SessionUUID       string  `json:"sessionUuid" validate:"required"`
	TestUuid          string  `json:"testUuid" validate:"required"`
	ResultDescription *string `json:"resultDescription" description:"If it is not provided - it will be generated"  `
}
