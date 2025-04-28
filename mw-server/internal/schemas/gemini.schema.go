package schemas

type GenerateMetricsPayload struct {
	WayName         string   `json:"wayName" validate:"required"`
	GoalDescription string   `json:"goalDescription" validate:"required"`
	Metrics         []string `json:"metrics" validate:"required"`
	Language        string   `json:"language" validate:"required" example:"ru|en|ua"`
}

type GenerateMetricsResponse struct {
	Metrics *[]string `json:"metrics" validate:"required"`
}

type AIChatPayload struct {
	Message  string `json:"message" validate:"required"`
	Language string `json:"language" validate:"required" example:"ru|en|ua"`
}

type AIChatResponse struct {
	Message string `json:"message" validate:"required"`
}

type AIGeneratePlansByMetricPayload struct {
	Goal     string `json:"goal" validate:"required"`
	Metric   string `json:"metric" validate:"required"`
	Language string `json:"language" validate:"required" example:"ru|en|ua"`
}

type AIGeneratePlansByMetricResponse struct {
	Plans []string `json:"plans" validate:"required"`
}

type AICommentIssuePayload struct {
	Goal     string `json:"goal" validate:"required"`
	Message  string `json:"message" validate:"required"`
	Language string `json:"language" validate:"required" example:"ru|en|ua"`
}

type AICommentIssueResponse struct {
	Comment string `json:"goal" validate:"required"`
}

type AIDecomposeIssuePayload struct {
	Goal     string `json:"goal" validate:"required"`
	Message  string `json:"message" validate:"required"`
	Language string `json:"language" validate:"required" example:"ru|en|ua"`
}

type AIDecomposeIssueResponse struct {
	Plans []string `json:"plans" validate:"required"`
}

type AIEstimateIssuePayload struct {
	Goal     string `json:"goal" validate:"required"`
	Issue    string `json:"issue" validate:"required"`
	Language string `json:"language" validate:"required" example:"ru|en|ua"`
}

type AIEstimateIssueResponse struct {
	Estimation string `json:"estimation" validate:"required"`
}

type AIGenerateTopicsForTrainingPayload struct {
	TopicsAmount               int     `json:"topicsAmount" validate:"required"`
	TrainingName               string  `json:"trainingName" validate:"required"`
	TrainingDescription        string  `json:"goal" validate:"required"`
	Language                   string  `json:"language" validate:"required" example:"ru|en|ua"`
	FullParentTopicDescription *string `json:"fullParentTopicDescription" extensions:"x-nullable"`
}

type AIGenerateTopicsForTrainingResponse struct {
	TopicNames []string `json:"topics" validate:"required"`
}

type AIGenerateTheoryMaterialForTopicPayload struct {
	TrainingName          string   `json:"trainingName" validate:"required"`
	TrainingDescription   string   `json:"trainingDescription" validate:"required"`
	TopicName             string   `json:"topicName" validate:"required"`
	TheoryMaterialNames   []string `json:"existentTheoryMaterials" validate:"required"`
	PracticeMaterialNames []string `json:"existentPracticeMaterials" validate:"required"`
	Language              string   `json:"language" validate:"required" example:"ru|en|ua"`
}

type AIGenerateTheoryMaterialForTopicResponse struct {
	Name        string `json:"name" validate:"required"`
	Description string `json:"description" validate:"required"`
}

type AIGeneratePracticeMaterialForTopicPayload struct {
	TrainingName          string   `json:"trainingName" validate:"required"`
	TrainingDescription   string   `json:"trainingDescription" validate:"required"`
	TopicName             string   `json:"topicName" validate:"required"`
	TheoryMaterialNames   []string `json:"existentTheoryMaterials" validate:"required"`
	PracticeMaterialNames []string `json:"existentPracticeMaterials" validate:"required"`
	GenerateAmount        int      `json:"generateAmount" validate:"required"`
	Language              string   `json:"language" validate:"required" example:"ru|en|ua"`
}

type GeneratedPracticeMaterial struct {
	Name            string `json:"name" validate:"required"`
	TaskDescription string `json:"taskDescription" validate:"required"`
	Answer          string `json:"answer" validate:"required"`
	TimeToAnswer    int    `json:"timeToAnswer" validate:"required"`
}

type AIGeneratePracticeMaterialsForTopicResponse struct {
	PracticeMaterials []GeneratedPracticeMaterial `json:"practiceMaterials" validate:"required"`
}
