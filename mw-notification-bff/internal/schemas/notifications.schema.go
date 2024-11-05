package schemas

type UpdateNotificationPayload struct {
	IsRead bool `json:"isRead" validate:"required"`
}
