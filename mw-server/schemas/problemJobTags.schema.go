package schemas

type CreateProblemJobTagPayload struct {
	ProblemUuid string `json:"problemUuid" validate:"required"`
	JobTagUuid  string `json:"jobTagUuid" validate:"required"`
}
