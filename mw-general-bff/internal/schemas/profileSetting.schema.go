package schemas

type ProfileSetting struct {
	Uuid           string `json:"uuid" validate:"required"`
	PricingPlan    string `json:"pricingPlan" validate:"required"`
	Coins          int32  `json:"coins" validate:"required"`
	ExpirationDate string `json:"expirationDate" validate:"required"`
}
