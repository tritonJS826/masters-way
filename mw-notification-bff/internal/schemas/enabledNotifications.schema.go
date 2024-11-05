package schemas

type UpdateEnabledNotificationPayload struct {
	IsEnabled bool `json:"isEnabled" validate:"required"`
}
