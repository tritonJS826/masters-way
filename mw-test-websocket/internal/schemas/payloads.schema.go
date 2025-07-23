package schemas

type UserJoinedSessionEventPayload struct {
	UserUuid string `json:"userUuid" validate:"required"`
}
type UserReadyToStartPlayEventPayload struct {
	UserUuid string `json:"userUuid" validate:"required"`
}
type HostStartedGameEventPayload struct {
	SpeedScale         float32 `json:"speedScale" validate:"required"`
	EnemySpawnInterval int     `json:"enemySpawnInterval" validate:"required"`
}
type UserCapturedTargetEventPayload struct {
	UserUuid     string `json:"userUuid" validate:"required"`
	QuestionUuid string `json:"questionUuid" validate:"required"`
}
type UserAnsweredQuestionEventPayload struct {
	UserUuid     string `json:"userUuid" validate:"required"`
	QuestionUuid string `json:"questionUuid" validate:"required"`
}
type UserAnswerHandledByServerEventPayload struct {
	IsOk                bool   `json:"isOk" validate:"required"`
	UserUuid            string `json:"userUuid" validate:"required"`
	UserAnswer          string `json:"userAnswer" validate:"required"`
	QuestionName        string `json:"questionName" validate:"required"`
	QuestionDescription string `json:"questionDescription" validate:"required"`
	QuestionAnswer      string `json:"questionAnswer" validate:"required"`
	ResultDescription   string `json:"resultDescription" validate:"required"`
	QuestionUuid        string `json:"questionUuid" validate:"required"`
	// handledAnswer identification
	Uuid string `json:"resultUuid" validate:"required"`
}
