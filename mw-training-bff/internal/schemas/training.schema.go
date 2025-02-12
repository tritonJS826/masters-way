package schemas

type CreateTrainingPayload struct {
	Name        string `json:"name" validate:"required"`
	Description string `json:"description" validate:"required"`
	IsPrivate   bool   `json:"isPrivate" validate:"required"`
}

type UpdateTrainingPayload struct {
	Name        *string `json:"name" extensions:"x-nullable"`
	Description *string `json:"description" extensions:"x-nullable"`
	IsPrivate   *bool   `json:"isPrivate" extensions:"x-nullable"`
}

type Training struct {
	Uuid                 string        `json:"uuid" validate:"required"`
	Name                 string        `json:"name" validate:"required"`
	Description          string        `json:"description" validate:"required"`
	IsPrivate            bool          `json:"isPrivate" validate:"required"`
	Owner                User          `json:"owner" validate:"required"`
	Mentors              []User        `json:"mentors" validate:"required"`
	Students             []User        `json:"students" validate:"required"`
	TrainingTags         []TrainingTag `json:"trainingTags" validate:"required"`
	FavoriteForUserUuids []string      `json:"favoriteForUserUuids" validate:"required"`
	Topics               []Topic       `json:"topics" validate:"required"`
	CreatedAt            string        `json:"createdAt" validate:"required"`
	UpdatedAt            string        `json:"updatedAt" validate:"required"`
}

type TrainingPreview struct {
	Uuid                   string        `json:"uuid" validate:"required"`
	Name                   string        `json:"name" validate:"required"`
	Description            string        `json:"description" validate:"required"`
	IsPrivate              bool          `json:"isPrivate" validate:"required"`
	Owner                  User          `json:"owner" validate:"required"`
	Mentors                []User        `json:"mentors" validate:"required"`
	StudentsAmount         int32         `json:"studentsAmount" validate:"required"`
	TrainingTags           []TrainingTag `json:"trainingTag" validate:"required"`
	FavoriteForUsersAmount int32         `json:"favoriteForUsersAmount" validate:"required"`
	TopicsAmount           int32         `json:"topicsAmount" validate:"required"`
	CreatedAt              string        `json:"createdAt" validate:"required"`
	UpdatedAt              string        `json:"updatedAt" validate:"required"`
}

type TrainingList struct {
	Size      int32             `json:"size" validate:"required"`
	Trainings []TrainingPreview `json:"trainings" validate:"required"`
}
