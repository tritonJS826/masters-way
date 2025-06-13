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

type QuestionResult struct {
	IsOk                bool   `json:"isOk" validate:"required"`
	QuestionName        string `json:"questionName" validate:"required"`
	QuestionDescription string `json:"questionDescription" validate:"required"`
	UserAnswer          string `json:"userAnswer" validate:"required"`
	QuestionAnswer      string `json:"questionAnswer" validate:"required"`
	ResultDescription   string `json:"resultDescription" validate:"required"`
}

type AIGenerateTrainingDescriptionByTestResultsPayload struct {
	TestName            string           `json:"testName" validate:"required"`
	TestDescription     string           `json:"testDescription" validate:"required"`
	TestQuestionResults []QuestionResult `json:"testQuestionResults" validate:"required"`
	TestSessionResult   string           `json:"testSessionResult" validate:"required"`
	Language            string           `json:"language" validate:"required" example:"ru|en|ua"`
}

type AIGenerateTrainingDescriptionByTestResultsResponse struct {
	TrainingName        string `json:"trainingName" validate:"required"`
	TrainingDescription string `json:"trainingDescription" validate:"required"`
}

type AIGenerateTopicsForTrainingPayload struct {
	TopicsAmount               int     `json:"topicsAmount" validate:"required"`
	TrainingName               string  `json:"trainingName" validate:"required"`
	TrainingDescription        string  `json:"goal" validate:"required"`
	Language                   string  `json:"language" validate:"required" example:"ru|en|ua"`
	FullParentTopicDescription *string `json:"fullParentTopicDescription"`
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

type AIGenerateQuestionsForTestPayload struct {
	TestDescription string   `json:"testDescription" validate:"required"`
	TestName        string   `json:"testName" validate:"required"`
	GenerateAmount  int      `json:"generateAmount" validate:"required"`
	Language        string   `json:"language" validate:"required" example:"ru|en|ua"`
	Questions       []string `json:"questions" validate:"required"`
}

type GeneratedQuestion struct {
	QuestionText string `json:"questionText" validate:"required"`
	TimeToAnswer int    `json:"timeToAnswer" validate:"required" description:"13, 120 etc.: in seconds"`
	Answer       string `json:"answer" validate:"required"`
	Name         string `json:"name" validate:"required"`
}

type AIGenerateQuestionsForTestResponse struct {
	Questions []GeneratedQuestion `json:"questions" validate:"required"`
}

type AIGenerateQuestionResultPayload struct {
	QuestionName    string `json:"questionName" validate:"required"`
	QuestionText    string `json:"questionText" validate:"required"`
	AnswerByCreator string `json:"answerByCreator" validate:"required"`
	AnswerFromUser  string `json:"answerFromUser" validate:"required"`
	Language        string `json:"language" validate:"required" example:"ru|en|ua"`
}

type AIGenerateQuestionResultResponse struct {
	IsOk              bool   `json:"isOk" validate:"required"`
	ResultDescription string `json:"resultDescription" validate:"required"`
}
