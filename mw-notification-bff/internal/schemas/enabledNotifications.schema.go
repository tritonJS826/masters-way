package schemas

type UpdateEnabledNotificationPayload struct {
	IsEnabled bool `json:"isEnabled" validate:"required"`
}

type EnabledNotificationResponse struct {
	UUID      string `json:"uuid" validate:"required"`
	UserUUID  string `json:"userUuid" validate:"required"`
	Nature    string `json:"nature" validate:"required"`
	Channel   string `json:"channel" validate:"required"`
	IsEnabled bool   `json:"isEnabled" validate:"required"`
}

type GetEnabledNotificationListResponse struct {
	EnabledNotifications []EnabledNotificationResponse `json:"enabledNotifications" validate:"required"`
}
