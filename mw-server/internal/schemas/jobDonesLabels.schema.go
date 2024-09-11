package schemas

type CreateJobDoneLabelPayload struct {
	JobDoneUuid string `json:"jobDoneUuid" validate:"required"`
	LabelUuid   string `json:"labelUuid" validate:"required"`
}
