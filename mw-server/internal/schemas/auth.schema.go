package schemas

type GoogleToken struct {
	AccessToken string `json:"accessToken" validate:"required"`
}

type GetAuthCallbackFunctionResponse struct {
	UserUUID string `json:"userUuid" validate:"required"`
	Url      string `json:"url" validate:"required"`
}

type BeginAuthResponse struct {
	Url string `json:"url" validate:"required"`
}

type GetUserTokenByEmailResponse struct {
	UserUUID string `json:"userUuid" validate:"required"`
	Url      string `json:"url" validate:"required"`
}
