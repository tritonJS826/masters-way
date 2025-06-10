package schemas

type CreateTrainingTestRequest struct {
	TrainingUUID string `json:"trainingUuid" validate:"required"`
	TestUUID     string `json:"testUuid" validate:"required"`
}
