package schemas

type GoogleToken struct {
	AccessToken string `json:"accessToken" validate:"required"`
}
