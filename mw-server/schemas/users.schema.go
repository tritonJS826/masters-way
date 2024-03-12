package schemas

type CreateUserPayload struct {
	Name        string `json:"name" validate:"required"`
	Email       string `json:"email" validate:"required"`
	Description string `json:"description" validate:"required"`
	ImageUrl    string `json:"imageUrl" validate:"required" extensions:"x-nullable"`
	IsMentor    bool   `json:"isMentor" validate:"required"`
}

type UpdateUserPayload struct {
	Name        string `json:"name"`
	Email       string `json:"email"`
	Description string `json:"description"`
	ImageUrl    string `json:"imageUrl" extensions:"x-nullable"`
	IsMentor    bool   `json:"isMentor"`
}

type UserPlainResponse struct {
	Uuid        string `json:"uuid" validate:"required"`
	Name        string `json:"name" validate:"required"`
	Email       string `json:"email" validate:"required"`
	Description string `json:"description" validate:"required"`
	CreatedAt   string `json:"createdAt" validate:"required"`
	ImageUrl    string `json:"imageUrl" validate:"required" extensions:"x-nullable"`
	IsMentor    bool   `json:"isMentor" validate:"required"`
}

type UserPlainResponseWithInfo struct {
	Uuid             string            `json:"uuid" validate:"required"`
	Name             string            `json:"name" validate:"required"`
	Email            string            `json:"email" validate:"required"`
	Description      string            `json:"description" validate:"required"`
	CreatedAt        string            `json:"createdAt" validate:"required"`
	ImageUrl         string            `json:"imageUrl" validate:"required" extensions:"x-nullable"`
	IsMentor         bool              `json:"isMentor" validate:"required"`
	FavoriteForUsers int32             `json:"favoriteForUsers" validate:"required"`
	MentoringWays    int32             `json:"mentoringWays" validate:"required"`
	OwnWays          int32             `json:"ownWays" validate:"required"`
	Tags             []UserTagResponse `json:"tags" validate:"required"`
}

type UserPopulatedResponse struct {
	Uuid             string                           `json:"uuid" validate:"required"`
	Name             string                           `json:"name" validate:"required"`
	Email            string                           `json:"email" validate:"required"`
	Description      string                           `json:"description" validate:"required"`
	CreatedAt        string                           `json:"createdAt" validate:"required"`
	ImageUrl         string                           `json:"imageUrl" validate:"required" extensions:"x-nullable"`
	IsMentor         bool                             `json:"isMentor" validate:"required"`
	WayCollections   []WayCollectionPopulatedResponse `json:"wayCollections" validate:"required"`
	FavoriteForUsers []string                         `json:"favoriteForUsers" validate:"required"`
	FavoriteUsers    []UserPlainResponse              `json:"favoriteUsers" validate:"required"`
	Tags             []UserTagResponse                `json:"tags" validate:"required"`
	WayRequests      []WayPlainResponse               `json:"wayRequests" validate:"required"`
}
