package schemas

type CreateUserProjectPayload struct {
	UserID    string `json:"userId" validate:"required"`
	ProjectID string `json:"projectId" validate:"required"`
}
