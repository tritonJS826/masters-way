package schemas

type GenerateMetricsPayload struct {
	WayName         string   `json:"wayName" validate:"required"`
	GoalDescription string   `json:"goalDescription" validate:"required"`
	Metrics         []string `json:"metrics" validate:"required"`
}

type GenerateMetricsResponse struct {
	Metrics *[]string `json:"metrics" validate:"required"`
}

type AIChatPayload struct {
	Message string `json:"message" validate:"required"`
}

type AIChatResponse struct {
	Message string `json:"message" validate:"required"`
}
