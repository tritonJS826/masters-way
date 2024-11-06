package schemas

type CreateNotificationPayload struct {
	Description string `json:"description" validate:"required"`
	Url         string `json:"url" validate:"required"`
	Nature      string `json:"nature" validate:"required"`
}

type UpdateNotificationPayload struct {
	IsRead bool `json:"isRead" validate:"required"`
}

type NotificationResponse struct {
	UUID        string `json:"uuid" validate:"required"`
	UserUUID    string `json:"userUuid" validate:"required"`
	IsRead      bool   `json:"isRead" validate:"required"`
	Description string `json:"description" validate:"required"`
	Url         string `json:"url" validate:"required"`
	Nature      string `json:"nature" validate:"required"`
	CreatedAt   string `json:"createdAt" validate:"required"`
}

type GetNotificationListResponse struct {
	Size          int                    `json:"size" validate:"required"`
	Notifications []NotificationResponse `json:"notifications" validate:"required"`
}
