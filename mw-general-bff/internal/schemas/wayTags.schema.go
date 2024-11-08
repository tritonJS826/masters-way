package schemas

type CreateWayTagPayload struct {
	Name    string `json:"name" validate:"required"`
	WayUuid string `json:"wayUuid" validate:"required"`
}

type UpdateWayTagPayload struct {
	Name string `json:"name"`
}

type UpdateWayTagResponse struct {
	Uuid string `json:"uuid" validate:"required"`
	Name string `json:"name" validate:"required"`
}

type WayTagResponse struct {
	Uuid string `json:"uuid" validate:"required"`
	Name string `json:"name" validate:"required"`
}
