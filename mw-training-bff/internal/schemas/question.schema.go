package schemas

type Question struct {
	UUID         string  `json:"uuid" validate:"required"`
	Name         *string `json:"name,omitempty"`
	TestUUID     string  `json:"test_uuid" validate:"required"`
	QuestionText string  `json:"questionText" validate:"required"`
	Order        int32   `json:"order" validate:"required"`
	TimeToAnswer int32   `json:"time_to_answer" validate:"required"`
	Answer       string  `json:"answer" validate:"required"`
	IsActive     bool    `json:"is_active" validate:"required"`
	CreatedAt    string  `json:"createdAt" validate:"required"`
	UpdatedAt    string  `json:"updatedAt" validate:"required"`
}

type CreateQuestionPayload struct {
	TestUUID     string  `json:"test_uuid" validate:"required"`
	Name         string  `json:"name" validate:"required"`
	QuestionText *string `json:"questionText,omitempty" validate:"required"`
	TimeToAnswer *int32  `json:"timeToAnswer,omitempty" validate:"required"`
	Answer       *string `json:"answer,omitempty" validate:"required"`
	PracticeType string  `json:"practice_type" validate:"required"`
}

type UpdateQuestionPayload struct {
	Name         *string `json:"name,omitempty"`
	QuestionText *string `json:"questionText,omitempty"`
	TimeToAnswer *int32  `json:"timeToAnswer,omitempty"`
	Answer       *string `json:"answer,omitempty"`
	PracticeType *string `json:"practice_type,omitempty"`
	Order        *int32  `json:"order,omitempty"`
}

type DeleteQuestionRequest struct {
	UserUUID     string `json:"userUuid" validate:"required"`
	QuestionUUID string `json:"questionUuid" validate:"required"`
}
