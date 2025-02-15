package schemas

type CreateTrainingTrainingTagPayload struct {
	Name string `json:"name" validate:"required"`
}

type TrainingTag struct {
	Name string `json:"name" validate:"required"`
}
