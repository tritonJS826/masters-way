package schemas

type CreatePracticeMaterialPayload struct {
	TopicUuid       string `json:"topicUuid" validate:"required"`
	Name            string `json:"name" validate:"required"`
	TaskDescription string `json:"taskDescription" validate:"required"`
	Answer          string `json:"answer" validate:"required"`
	PracticeType    string `json:"practiceType" validate:"required"`
	TimeToAnswer    int32  `json:"timeToAnswer" validate:"required"`
}

type UpdatePracticeMaterialPayload struct {
	Name            *string `json:"name"`
	TaskDescription *string `json:"taskDescription"`
	Answer          *string `json:"answer"`
	PracticeType    *string `json:"practiceType"`
	TimeToAnswer    *int32  `json:"timeToAnswer"`
	Order           *int32  `json:"order"`
}

type PracticeMaterials struct {
	Size              int32              `json:"size" validate:"required"`
	PracticeMaterials []PracticeMaterial `json:"practiceMaterials" validate:"required"`
}

type PracticeMaterial struct {
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
