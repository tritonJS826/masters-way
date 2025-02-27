package schemas

type CreateTheoryMaterialPayload struct {
	TopicUuid   string `json:"topicUuid" validate:"required"`
	Name        string `json:"name" validate:"required"`
	Description string `json:"description" validate:"required"`
}

type UpdateTheoryMaterialPayload struct {
	Name        *string `json:"name"`
	Description *string `json:"description"`
}

type TheoryMaterials struct {
	Size            int32            `json:"size" validate:"required"`
	TheoryMaterials []TheoryMaterial `json:"theoryMaterials" validate:"required"`
}

type TheoryMaterial struct {
	Uuid                string `json:"uuid" validate:"required"`
	TopicUuid           string `json:"topicUuid" validate:"required"`
	Name                string `json:"name" validate:"required"`
	TheoryMaterialOrder int32  `json:"order" validate:"required"`
	Description         string `json:"description" validate:"required"`
	CreatedAt           string `json:"createdAt" validate:"required"`
	UpdatedAt           string `json:"updatedAt" validate:"required"`
}
