package schemas

type CreateMessagePayload struct {
	Message string `json:"message" validate:"required"`
}

type MessageReader struct {
	UserID   string `json:"userId" validate:"required"`
	Name     string `json:"ownerName" validate:"required"`
	ImageURL string `json:"ownerImageUrl" validate:"required"`
	ReadDate string `json:"readDate" validate:"required"`
}

type MessageResponse struct {
	MessageID     string          `json:"messageId" validate:"required"`
	OwnerID       string          `json:"ownerId" validate:"required"`
	OwnerName     string          `json:"ownerName" validate:"required"`
	OwnerImageURL string          `json:"ownerImageUrl" validate:"required"`
	Message       string          `json:"message" validate:"required"`
	Readers       []MessageReader `json:"messageReaders" validate:"required"`
}

type SendMessagePayload struct {
	UserIDs []string        `json:"userIds" validate:"required"`
	Message MessageResponse `json:"message" validate:"required"`
}

type UpdateMessageStatusPayload struct {
	IsRead bool `json:"isRead" validate:"required"`
}
