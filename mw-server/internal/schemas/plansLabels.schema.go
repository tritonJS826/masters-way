package schemas

type CreatePlanLabelPayload struct {
	PlanUuid  string `json:"planUuid" validate:"required"`
	LabelUuid string `json:"labelUuid" validate:"required"`
}
