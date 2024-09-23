package schemas

type CreateProjectPayload struct {
	Name    string `json:"name" validate:"required"`
	OwnerID string `json:"ownerId" validate:"required"`
}

type UpdateProjectPayload struct {
	Name      *string `json:"name" extensions:"x-nullable"`
	IsPrivate *bool   `json:"isPrivate" extensions:"x-nullable"`
}

type GetProjectsByUserIDResponse struct {
	Projects []ProjectPlainResponse `json:"projects" validate:"required"`
}

type ProjectPlainResponse struct {
	ID        string `json:"id" validate:"required"`
	Name      string `json:"name" validate:"required"`
	IsPrivate bool   `json:"isPrivate" validate:"required"`
}

type ProjectPopulatedResponse struct {
	ID        string                      `json:"id" validate:"required"`
	Name      string                      `json:"name" validate:"required"`
	OwnerID   string                      `json:"ownerId" validate:"required"`
	IsPrivate bool                        `json:"isPrivate" validate:"required"`
	Ways      []WayPlainResponse          `json:"ways" validate:"required"`
	Users     []UserPlainResponseWithInfo `json:"users" validate:"required"`
}
