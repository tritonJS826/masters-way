package schemas

type UpdateTopicPayload struct {
	Name string `json:"name" validate:"required"`
}

type TopicPreview struct {
	Uuid                   string  `json:"uuid" validate:"required"`
	Name                   string  `json:"name" validate:"required"`
	TrainingUuid           string  `json:"trainingUuid" validate:"required"`
	TopicOrder             int32   `json:"order" validate:"required"`
	TheoryMaterialAmount   int32   `json:"theoryMaterialAmount" validate:"required"`
	PracticeMaterialAmount int32   `json:"practiceMaterialAmount" validate:"required"`
	ParentUuid             *string `json:"parentUuid" validate:"required" extensions:"x-nullable"`
	CreatedAt              string  `json:"createdAt" validate:"required"`
}

type Topic struct {
	Uuid              string             `json:"uuid" validate:"required"`
	Name              string             `json:"name" validate:"required"`
	TrainingUuid      string             `json:"trainingUuid" validate:"required"`
	Owner             User               `json:"owner" validate:"required"`
	TopicOrder        int32              `json:"order" validate:"required"`
	TheoryMaterials   []TheoryMaterial   `json:"theoryMaterials" validate:"required"`
	PracticeMaterials []PracticeMaterial `json:"practiceMaterials" validate:"required"`
	ParentUuid        *string            `json:"parentUuid" validate:"required" extensions:"x-nullable"`
	CreatedAt         string             `json:"createdAt" validate:"required"`
}
