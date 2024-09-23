package schemas

type CreateMessagePayload struct {
	RoomID  string `json:"roomId" validate:"required"`
	Message string `json:"message" validate:"required"`
}

type MessageReader struct {
	UserID   string `json:"userId" validate:"required"`
	ReadDate string `json:"readDate" validate:"required"`
}

type MessageResponse struct {
	MessageID string          `json:"messageId" validate:"required"`
	OwnerID   string          `json:"ownerId" validate:"required"`
	Message   string          `json:"message" validate:"required"`
	Readers   []MessageReader `json:"messageReaders" validate:"required"`
}

type CreateMessageResponse struct {
	Users   []string        `json:"users" validate:"required"`
	Message MessageResponse `json:"message" validate:"required"`
}

type UpdateMessageStatusPayload struct {
	IsRead bool `json:"isRead" validate:"required"`
}
