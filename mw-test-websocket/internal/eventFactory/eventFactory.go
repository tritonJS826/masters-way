package eventfactory

import "mw-test-websocket/internal/schemas"

func MakeMessageReceivedEvent(payload schemas.MessageResponse) *schemas.MessageReceivedEvent {
	return &schemas.MessageReceivedEvent{
		Type:    schemas.MessageReceivedEventType,
		Payload: payload,
	}
}

func MakeRoomCreatedEvent(payload schemas.RoomPopulatedResponse) *schemas.RoomCreatedEvent {
	return &schemas.RoomCreatedEvent{
		Type:    schemas.RoomCreatedEventType,
		Payload: payload,
	}
}
