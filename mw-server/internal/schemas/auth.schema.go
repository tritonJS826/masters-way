package schemas

type GoogleToken struct {
	AccessToken string `json:"accessToken" validate:"required"`
}

type GetAuthCallbackFunctionResponse struct {
	IsAlreadyCreated bool   `json:"isAlreadyCreated" validate:"required"`
	Url              string `json:"url" validate:"required"`
}

type BeginAuthResponse struct {
	Url string `json:"url" validate:"required"`
}
