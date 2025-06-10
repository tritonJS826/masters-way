package schemas

type GetTestListRequest struct {
	Name  string `json:"name" validate:"required"`
	Page  int32  `json:"page" validate:"required"`
	Limit int32  `json:"limit" validate:"required"`
}

type TestPreview struct {
	UUID        string `json:"uuid" validate:"required"`
	Name        string `json:"name" validate:"required"`
	Description string `json:"description" validate:"required"`
	OwnerUUID   string `json:"ownerUuid" validate:"required"`
	UpdatedAt   string `json:"updatedAt" validate:"required"`
	CreatedAt   string `json:"createdAt" validate:"required"`
}

type TestPreviewList struct {
	Size      int32          `json:"size" validate:"required"`
	TestsList []*TestPreview `json:"testsList" validate:"required"`
}

type CreateTestRequest struct {
	Name        string `json:"name" validate:"required"`
	Description string `json:"description" validate:"required"`
	IsPrivate   bool   `json:"isPrivate" validate:"required"`
	OwnerUUID   string `json:"ownerUuid" validate:"required"`
}

type UpdateTestRequest struct {
	Name        *string `json:"name,omitempty"`
	Description *string `json:"description,omitempty"`
	IsPrivate   *bool   `json:"isPrivate,omitempty"`
}

type TestsAmount struct {
	Own       int32 `json:"own" validate:"required"`
	Completed int32 `json:"completed" validate:"required"`
}

type Test struct {
	UUID        string      `json:"uuid" validate:"required"`
	Name        string      `json:"name" validate:"required"`
	Description string      `json:"description" validate:"required"`
	OwnerUUID   string      `json:"ownerUuid" validate:"required"`
	IsPrivate   bool        `json:"isPrivate" validate:"required"`
	UpdatedAt   string      `json:"updatedAt" validate:"required"`
	CreatedAt   string      `json:"createdAt" validate:"required"`
	Questions   []*Question `json:"questions" validate:"required"`
}

type GetTestByIdRequest struct {
	UUID      string `json:"uuid" validate:"required"`
	OwnerUUID string `json:"ownerUuid" validate:"required"`
}

type DeleteTestRequest struct {
	TestUUID  string `json:"testUuid" validate:"required"`
	OwnerUUID string `json:"ownerUuid" validate:"required"`
}

type GetTestsByUserIdRequest struct {
	OwnerUUID string `json:"ownerUuid" validate:"required"`
	UserUUID  string `json:"userUuid" validate:"required"`
}
