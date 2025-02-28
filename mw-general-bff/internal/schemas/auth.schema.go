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
