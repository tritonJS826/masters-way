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

type AIGeneratePlansByMetricPayload struct {
	Goal   string `json:"goal" validate:"required"`
	Metric string `json:"metric" validate:"required"`
}

type AIGeneratePlansByMetricResponse struct {
	Plans []string `json:"plans" validate:"required"`
}

type AICommentIssuePayload struct {
	Goal    string `json:"goal" validate:"required"`
	Message string `json:"message" validate:"required"`
}

type AICommentIssueResponse struct {
	Comment string `json:"goal" validate:"required"`
}

type AIDecomposeIssuePayload struct {
	Goal    string `json:"goal" validate:"required"`
	Message string `json:"message" validate:"required"`
}

type AIDecomposeIssueResponse struct {
	Plans []string `json:"plans" validate:"required"`
}

type AIEstimateIssuePayload struct {
	Goal  string `json:"goal" validate:"required"`
	Issue string `json:"issue" validate:"required"`
}

type AIEstimateIssueResponse struct {
	Estimation string `json:"estimation" validate:"required"`
}
