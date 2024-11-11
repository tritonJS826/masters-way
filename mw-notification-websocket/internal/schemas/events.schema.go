package schemas

const NotificationReceivedEventType = "mw-chat-websocket:message-received"

// Abstract event for example (all fields required and name )
type BaseEvent struct {
	Type    string      `json:"type" validate:"required"`
	Payload interface{} `json:"payload" validate:"required"`
}

type NotificationReceivedEvent struct {
	Type    string               `json:"type" validate:"required"`
	Payload NotificationResponse `json:"payload" validate:"required"`
}
