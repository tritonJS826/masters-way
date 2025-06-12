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
	TopicsAmount  int32   `json:"topicsAmount" validate:"required"`
	TrainingId    string  `json:"trainingId" validate:"required"`
	Language      string  `json:"language" validate:"required" example:"ru|en|ua"`
	ParentTopicId *string `json:"parentTopicId"`
}

type AIGenerateTopicsForTrainingResponse struct {
	Topics []GeneratedTopicPreview `json:"topics" validate:"required"`
}

type AIGenerateTheoryMaterialForTrainingPayload struct {
	TrainingId string `json:"trainingId" validate:"required"`
	TopicId    string `json:"topicId" validate:"required"`
	Language   string `json:"language" validate:"required" example:"ru|en|ua"`
}

type AIGenerateTheoryMaterialForTrainingResponse struct {
	Uuid                string `json:"uuid" validate:"required"`
	TopicUuid           string `json:"topicUuid" validate:"required"`
	Name                string `json:"name" validate:"required"`
	TheoryMaterialOrder int32  `json:"order" validate:"required"`
	Description         string `json:"description" validate:"required"`
	CreatedAt           string `json:"createdAt" validate:"required"`
	UpdatedAt           string `json:"updatedAt" validate:"required"`
}

type AIGeneratePracticeMaterialForTopicPayload struct {
	TopicId        string `json:"topicId" validate:"required"`
	TrainingId     string `json:"trainingId" validate:"required"`
	GenerateAmount int32  `json:"generateAmount" validate:"required"`
	Language       string `json:"language" validate:"required" example:"ru|en|ua"`
}

type GeneratedPracticeMaterial struct {
	Uuid                  string `json:"uuid" validate:"required"`
	TopicUuid             string `json:"topicUuid" validate:"required"`
	Name                  string `json:"name" validate:"required"`
	PracticeMaterialOrder int32  `json:"order" validate:"required"`
	TaskDescription       string `json:"taskDescription" validate:"required"`
	Answer                string `json:"answer" validate:"required"`
	PracticeType          string `json:"practiceType" validate:"required"`
	TimeToAnswer          int32  `json:"timeToAnswer" validate:"required"`
	CreatedAt             string `json:"createdAt" validate:"required"`
	UpdatedAt             string `json:"updatedAt" validate:"required"`
}

type AIGeneratePracticeMaterialsForTrainingResponse struct {
	PracticeMaterials []GeneratedPracticeMaterial `json:"practiceMaterials" validate:"required"`
}

type AIGenerateQuestionsForTestPayload struct {
	TestId         string `json:"testId" validate:"required"`
	GenerateAmount int32  `json:"generateAmount" validate:"required"`
	Language       string `json:"language" validate:"required" example:"ru|en|ua"`
}

type GeneratedQuestion struct {
	UUID         string  `json:"uuid" validate:"required"`
	Name         *string `json:"name"`
	TestUUID     string  `json:"test_uuid" validate:"required"`
	QuestionText string  `json:"questionText" validate:"required"`
	Order        int32   `json:"order" validate:"required"`
	TimeToAnswer int32   `json:"time_to_answer" validate:"required"`
	Answer       string  `json:"answer" validate:"required"`
	IsActive     bool    `json:"is_active" validate:"required"`
	CreatedAt    string  `json:"createdAt" validate:"required"`
	UpdatedAt    string  `json:"updatedAt" validate:"required"`
}

type AIGenerateQuestionsForTestResponse struct {
	Questions []*GeneratedQuestion `json:"questions" validate:"required"`
}

type AIGenerateTrainingByTestTestSessionIdPayload struct {
	TestId                      string `json:"testSessionId" validate:"required" description:"probably we can remove this property if it will be required, but it will not be easy"`
	TestSessionId               string `json:"testSessionId" validate:"required"`
	GenerateTopicsAmount        int32  `json:"generateTopicsAmount" validate:"required"`
	PracticeMaterialInEachTopic int32  `json:"practiceMaterialInEachTopic" validate:"required"`
	Language                    string `json:"language" validate:"required" example:"ru|en|ua"`
}

type AIGenerateTrainingByTestTestSessionIdResponse struct {
	TrainingId string `json:"trainingId" validate:"required"`
}
