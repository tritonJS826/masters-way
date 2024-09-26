package schemas

type CreateJobDoneJobTagPayload struct {
	JobDoneUuid string `json:"jobDoneUuid" validate:"required"`
	JobTagUuid  string `json:"jobTagUuid" validate:"required"`
}
