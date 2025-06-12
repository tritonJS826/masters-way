package schemas

type GetTestSessionResultRequest struct {
	SessionUUID string `json:"sessionUuid" validate:"required"`
}

type GetTestSessionResultResponse struct {
	SessionUUID       string `json:"sessionUuid" validate:"required"`
	TestUUID          string `json:"testUuid" validate:"required"`
	ResultDescription string `json:"resultDescription" validate:"required"`
	CreatedAt         string `json:"createdAt" validate:"required"`
}

type CreateSessionResultRequest struct {
	SessionUUID       string  `json:"sessionUuid" validate:"required"`
	ResultDescription *string `json:"resultDescription" description:"If it is not provided - it will be generated"  `
}
