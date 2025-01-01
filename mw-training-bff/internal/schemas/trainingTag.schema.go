package schemas

type CreateTrainingTrainingTagPayload struct {
	Name string `json:"name" validate:"required"`
}

type TrainingTag struct {
	Uuid string `json:"uuid" validate:"required"`
	Name string `json:"name" validate:"required"`
}
