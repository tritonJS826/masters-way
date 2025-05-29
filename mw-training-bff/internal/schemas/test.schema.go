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
	OwnerUUID   string `json:"owner_uuid" validate:"required"`
	UpdatedAt   string `json:"updated_at" validate:"required"`
	CreatedAt   string `json:"created_at" validate:"required"`
}

type TestPreviewList struct {
	Size      int32          `json:"size" validate:"required"`
	TestsList []*TestPreview `json:"tests_list" validate:"required"`
}

type CreateTestRequest struct {
	Name        string `json:"name" validate:"required"`
	Description string `json:"description" validate:"required"`
	IsPrivate   bool   `json:"is_private" validate:"required"`
	OwnerUUID   string `json:"owner_uuid" validate:"required"`
}

type UpdateTestRequest struct {
	Name        *string `json:"name,omitempty"`
	Description *string `json:"description,omitempty"`
	IsPrivate   *bool   `json:"is_private,omitempty"`
}

type TestsAmount struct {
	Own       int32 `json:"own" validate:"required"`
	Completed int32 `json:"completed" validate:"required"`
}

type Test struct {
	UUID        string      `json:"uuid" validate:"required"`
	Name        string      `json:"name" validate:"required"`
	Description string      `json:"description" validate:"required"`
	OwnerUUID   string      `json:"owner_uuid" validate:"required"`
	UpdatedAt   string      `json:"updated_at" validate:"required"`
	CreatedAt   string      `json:"created_at" validate:"required"`
	Questions   []*Question `json:"questions" validate:"required"`
}

type GetTestByIdRequest struct {
	UUID      string `json:"uuid" validate:"required"`
	OwnerUUID string `json:"owner_uuid" validate:"required"`
}

type DeleteTestRequest struct {
	TestUUID  string `json:"test_uuid" validate:"required"`
	OwnerUUID string `json:"owner_uuid" validate:"required"`
}

type GetTestsByUserIdRequest struct {
	OwnerUUID string `json:"owner_uuid" validate:"required"`
	UserUUID  string `json:"user_uuid" validate:"required"`
}
