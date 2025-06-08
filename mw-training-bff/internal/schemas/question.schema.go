package schemas

type Question struct {
	UUID         string  `json:"uuid" validate:"required"`
	Name         *string `json:"name,omitempty"`
	TestUUID     string  `json:"test_uuid" validate:"required"`
	QuestionText string  `json:"question_text" validate:"required"`
	Order        int32   `json:"order" validate:"required"`
	TimeToAnswer int32   `json:"time_to_answer" validate:"required"`
	Answer       string  `json:"answer" validate:"required"`
	IsActive     bool    `json:"is_active" validate:"required"`
	CreatedAt    string  `json:"created_at" validate:"required"`
	UpdatedAt    string  `json:"updated_at" validate:"required"`
}

type CreateQuestionPayload struct {
	TestUUID     string  `json:"test_uuid" validate:"required"`
	Name         string  `json:"name" validate:"required"`
	QuestionText *string `json:"question_text,omitempty" validate:"required"`
	TimeToAnswer *int32  `json:"time_to_answer,omitempty" validate:"required"`
	Answer       *string `json:"answer,omitempty" validate:"required"`
	PracticeType string  `json:"practice_type" validate:"required"`
}

type UpdateQuestionPayload struct {
	Name         *string `json:"name,omitempty"`
	QuestionText *string `json:"question_text,omitempty"`
	TimeToAnswer *int32  `json:"time_to_answer,omitempty"`
	Answer       *string `json:"answer,omitempty"`
	PracticeType *string `json:"practice_type,omitempty"`
	Order        *int32  `json:"order,omitempty"`
}

type DeleteQuestionRequest struct {
	UserUUID     string `json:"user_uuid" validate:"required"`
	QuestionUUID string `json:"question_uuid" validate:"required"`
}
