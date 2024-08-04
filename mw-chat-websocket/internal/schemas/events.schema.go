package schemas

const MessageReceivedEventType = "mw-chat-websocket:message-received"
const RoomCreatedEventType = "mw-chat-websocket:room-created"

// Abstract event for example (all fields required and name )
type BaseEvent struct {
	Type    string      `json:"type" validate:"required"`
	Payload interface{} `json:"payload" validate:"required"`
}

type MessageReceivedEvent struct {
	Type    string          `json:"type" validate:"required"`
	Payload MessageResponse `json:"payload" validate:"required"`
}

type RoomCreatedEvent struct {
	Type    string                `json:"type" validate:"required"`
	Payload RoomPopulatedResponse `json:"payload" validate:"required"`
}
