package schemas

// abstract message for example (all fields required and name )
type BaseMessage struct {
	Type    string      `json:"type" validate:"required"`
	Payload interface{} `json:"payload" validate:"required"`
}

type MessageReceived struct {
	Type    string          `json:"type" validate:"required"`
	Payload MessageResponse `json:"payload" validate:"required"`
}

type MessageReader struct {
	UserID   string `json:"userId" validate:"required"`
	Name     string `json:"name" validate:"required"`
	ImageURL string `json:"imageUrl" validate:"required"`
	ReadDate string `json:"readDate" validate:"required"`
}

type MessageResponse struct {
	OwnerID       string          `json:"ownerId" validate:"required"`
	OwnerName     string          `json:"ownerName" validate:"required"`
	OwnerImageURL string          `json:"ownerImageUrl" validate:"required"`
	RoomID        string          `json:"roomId" validate:"required"`
	Message       string          `json:"message" validate:"required"`
	Readers       []MessageReader `json:"messageReaders" validate:"required"`
}

func MakeMessageReceived(payload *MessageResponse) *MessageReceived {
	return &MessageReceived{
		Type:    "mw-chat-websocket:message-received",
		Payload: *payload,
	}
}
