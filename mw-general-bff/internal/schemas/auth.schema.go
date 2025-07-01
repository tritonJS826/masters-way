package schemas

type GoogleToken struct {
	AccessToken string `json:"accessToken" validate:"required"`
}

type RefreshAccessTokenPayload struct {
	RefreshToken string `json:"refreshToken" validate:"required"`
}

type RefreshAccessTokenResponse struct {
	AccessToken string `json:"accessToken" validate:"required"`
}

type CurrentUserResponse struct {
	ProfileSetting     ProfileSetting                   `json:"profileSetting" validate:"required"`
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
	Projects           []ProjectPlainResponse           `json:"projects" validate:"required"`
	UserContacts       []UserContact                    `json:"userContacts" validate:"required"`
}
