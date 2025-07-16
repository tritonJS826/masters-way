package eventfactory

import "mw-test-websocket/internal/schemas"

func MakeUserJoinedSessionEvent(payload schemas.UserJoinedSessionEventPayload) *schemas.UserJoinedSessionEvent {
	return &schemas.UserJoinedSessionEvent{
		Type:    schemas.UserJoinedSessionEventType,
		Payload: payload,
	}
}

func MakeUserReadyToStartPlayEvent(payload schemas.UserReadyToStartPlayEventPayload) *schemas.UserReadyToStartPlayEvent {
	return &schemas.UserReadyToStartPlayEvent{
		Type:    schemas.UserReadyToStartPlayEventType,
		Payload: payload,
	}
}

func MakeHostStartedGameEvent(payload schemas.HostStartedGameEventPayload) *schemas.HostStartedGameEvent {
	return &schemas.HostStartedGameEvent{
		Type:    schemas.HostStartedGameEventType,
		Payload: payload,
	}
}

func MakeUserCapturedTargetEvent(payload schemas.UserCapturedTargetEventPayload) *schemas.UserCapturedTargetEvent {
	return &schemas.UserCapturedTargetEvent{
		Type:    schemas.UserCapturedTargetEventType,
		Payload: payload,
	}
}

func MakeUserAnsweredQuestionEvent(payload schemas.UserAnsweredQuestionEventPayload) *schemas.UserAnsweredQuestionEvent {
	return &schemas.UserAnsweredQuestionEvent{
		Type:    schemas.UserAnsweredQuestionEventType,
		Payload: payload,
	}
}

func MakeUserAnswerHandledByServerEvent(payload schemas.UserAnswerHandledByServerEventPayload) *schemas.UserAnswerHandledByServerEvent {
	return &schemas.UserAnswerHandledByServerEvent{
		Type:    schemas.UserAnsweredQuestionEventType,
		Payload: payload,
	}
}
