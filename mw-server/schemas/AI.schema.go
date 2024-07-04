package schemas

type GenerateMetricsPayload struct {
	WayName         string           `json:"wayName" validate:"required"`
	GoalDescription string           `json:"goalDescription" validate:"required"`
	Metrics         []MetricResponse `json:"metrics" validate:"required"`
}

type AIResponse struct {
	Answer string `json:"answer"`
}

// type GenerateCommentPayload struct {
// }
