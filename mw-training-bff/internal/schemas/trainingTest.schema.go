package schemas

type CreateTrainingTestRequest struct {
	TrainingUUID string `json:"training_uuid" validate:"required"`
	TestUUID     string `json:"test_uuid" validate:"required"`
}
