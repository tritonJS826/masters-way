package schemas

type CreateUserTagPayload struct {
	Name      string `json:"name" validate:"required"`
	OwnerUuid string `json:"ownerUuid" validate:"required"`
}

type UpdateUserTagPayload struct {
	Name string `json:"name"`
}

type UserTagResponse struct {
	Uuid string `json:"uuid" validate:"required"`
	Name string `json:"name" validate:"required"`
}
