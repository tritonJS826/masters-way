package schemas

type CreatePlanJobTagPayload struct {
	PlanUuid   string `json:"planUuid" validate:"required"`
	JobTagUuid string `json:"jobTagUuid" validate:"required"`
}
