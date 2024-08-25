package schemas

type CreateUserPayload struct {
	Name        string `json:"name" validate:"required"`
	Email       string `json:"email" validate:"required"`
	Description string `json:"description" validate:"required"`
	ImageUrl    string `json:"imageUrl" validate:"required"`
	IsMentor    bool   `json:"isMentor" validate:"required"`
}

type UpdateUserPayload struct {
	Name        *string `json:"name"`
	Description *string `json:"description"`
	ImageUrl    *string `json:"imageUrl"`
	IsMentor    *bool   `json:"isMentor"`
}

type UserPlainResponse struct {
	Uuid        string `json:"uuid" validate:"required"`
	Name        string `json:"name" validate:"required"`
	Email       string `json:"email" validate:"required"`
	Description string `json:"description" validate:"required"`
	CreatedAt   string `json:"createdAt" validate:"required"`
	ImageUrl    string `json:"imageUrl" validate:"required"`
	IsMentor    bool   `json:"isMentor" validate:"required"`
}

type UserPlainResponseWithInfo struct {
	Uuid             string            `json:"uuid" validate:"required"`
	Name             string            `json:"name" validate:"required"`
	Email            string            `json:"email" validate:"required"`
	Description      string            `json:"description" validate:"required"`
	CreatedAt        string            `json:"createdAt" validate:"required"`
	ImageUrl         string            `json:"imageUrl" validate:"required"`
	IsMentor         bool              `json:"isMentor" validate:"required"`
	FavoriteForUsers int32             `json:"favoriteForUsers" validate:"required"`
	FavoriteWays     int32             `json:"favoriteWays" validate:"required"`
	MentoringWays    int32             `json:"mentoringWays" validate:"required"`
	OwnWays          int32             `json:"ownWays" validate:"required"`
	Tags             []UserTagResponse `json:"tags" validate:"required"`
}

type UserPopulatedResponse struct {
	Uuid               string                           `json:"uuid" validate:"required"`
	Name               string                           `json:"name" validate:"required"`
	Email              string                           `json:"email" validate:"required"`
	Description        string                           `json:"description" validate:"required"`
	CreatedAt          string                           `json:"createdAt" validate:"required"`
	ImageUrl           string                           `json:"imageUrl" validate:"required"`
	IsMentor           bool                             `json:"isMentor" validate:"required"`
	WayCollections     []WayCollectionPopulatedResponse `json:"customWayCollections" validate:"required"`
	DefaultCollections DefaultWayCollections            `json:"defaultWayCollections" validate:"required"`
	FavoriteForUsers   []string                         `json:"favoriteForUsers" validate:"required"`
	FavoriteUsers      []UserPlainResponse              `json:"favoriteUsers" validate:"required"`
	Tags               []UserTagResponse                `json:"tags" validate:"required"`
	WayRequests        []WayPlainResponse               `json:"wayRequests" validate:"required"`
}

type GetAllUsersResponse struct {
	Size  int64                       `json:"size" validate:"required"`
	Users []UserPlainResponseWithInfo `json:"users" validate:"required"`
}

type GetUsersByIDsResponse struct {
	UserID   string `json:"userId" validate:"required"`
	Name     string `json:"name" validate:"required"`
	ImageURL string `json:"imageUrl" validate:"required"`
}
