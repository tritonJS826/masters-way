package schemas

type MessageReader struct {
	UserID   string `json:"userId" validate:"required"`
	Name     string `json:"name" validate:"required"`
	ImageURL string `json:"imageUrl" validate:"required"`
	ReadDate string `json:"readDate" validate:"required"`
}

type MessageResponse struct {
	MessageID     string          `json:"messageId" validate:"required"`
	OwnerID       string          `json:"ownerId" validate:"required"`
	OwnerName     string          `json:"ownerName" validate:"required"`
	OwnerImageURL string          `json:"ownerImageUrl" validate:"required"`
	RoomID        string          `json:"roomId" validate:"required"`
	Message       string          `json:"message" validate:"required"`
	Readers       []MessageReader `json:"messageReaders" validate:"required"`
}

type SendMessagePayload struct {
	Users   []string        `json:"users" validate:"required"`
	Message MessageResponse `json:"message" validate:"required"`
}
