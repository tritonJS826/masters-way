package schemas

type UpdateNotificationSettingPayload struct {
	IsEnabled bool `json:"isEnabled" validate:"required"`
}

type NotificationSettingResponse struct {
	UUID      string `json:"uuid" validate:"required"`
	UserUUID  string `json:"userUuid" validate:"required"`
	Nature    string `json:"nature" validate:"required"`
	Channel   string `json:"channel" validate:"required"`
	IsEnabled bool   `json:"isEnabled" validate:"required"`
}

type GetNotificationSettingListResponse struct {
	NotificationSettings []NotificationSettingResponse `json:"NotificationSettings" validate:"required"`
}
