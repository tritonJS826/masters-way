package schemas

type UpdateUserContactPayload struct {
	Description *string `json:"description"`
	ContactLink *string `json:"contactLink"`
}

type UserContact struct {
	Uuid        string `json:"uuid" validate:"required"`
	ContactLink string `json:"contactLink" validate:"required"`
	Description string `json:"description" validate:"required"`
}
