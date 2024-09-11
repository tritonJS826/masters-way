package schemas

type CreateLabelPayload struct {
	Name        string `json:"name" validate:"required"`
	Description string `json:"description" validate:"required"`
	Color       string `json:"color" validate:"required"`
	WayUuid     string `json:"wayUuid" validate:"required"`
}

type UpdateLabelPayload struct {
	Name        string `json:"name"`
	Description string `json:"description"`
	Color       string `json:"color"`
}

type LabelResponse struct {
	Uuid        string `json:"uuid" validate:"required"`
	Name        string `json:"name" validate:"required"`
	Description string `json:"description" validate:"required"`
	Color       string `json:"color" validate:"required"`
}
