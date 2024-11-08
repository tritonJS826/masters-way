package eventfactory

import "mw-chat-websocket/internal/schemas"

func MakeNotificationReceivedEvent(payload schemas.SendNotificationPayload) *schemas.NotificationReceivedEvent {
	return &schemas.NotificationReceivedEvent{
		Type:    schemas.NotificationReceivedEventType,
		Payload: schemas.NotificationResponse(payload),
	}
}
