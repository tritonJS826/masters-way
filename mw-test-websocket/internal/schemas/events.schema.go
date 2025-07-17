package schemas

const UserJoinedSessionEventType = "mw-test-websocket:user-joined-session"
const UserReadyToStartPlayEventType = "mw-test-websocket:user-ready-to-start-play"
const HostStartedGameEventType = "mw-test-websocket:host-started-game"
const UserCapturedTargetEventType = "mw-test-websocket:user-captured-target"
const UserAnsweredQuestionEventType = "mw-test-websocket:user-answered-question"
const UserAnswerHandledByServerEventType = "mw-test-websocket:user-answer-handled-by-server"

// Abstract event for example (all fields required and name )
type BaseEvent struct {
	Type    string      `json:"type" validate:"required"`
	Payload interface{} `json:"payload" validate:"required"`
}

type UserJoinedSessionEvent struct {
	Type    string                        `json:"type" validate:"required"`
	Payload UserJoinedSessionEventPayload `json:"payload" validate:"required"`
}

type UserReadyToStartPlayEvent struct {
	Type    string                           `json:"type" validate:"required"`
	Payload UserReadyToStartPlayEventPayload `json:"payload" validate:"required"`
}

type HostStartedGameEvent struct {
	Type    string                      `json:"type" validate:"required"`
	Payload HostStartedGameEventPayload `json:"payload" validate:"required"`
}

type UserCapturedTargetEvent struct {
	Type    string                         `json:"type" validate:"required"`
	Payload UserCapturedTargetEventPayload `json:"payload" validate:"required"`
}

type UserAnsweredQuestionEvent struct {
	Type    string                           `json:"type" validate:"required"`
	Payload UserAnsweredQuestionEventPayload `json:"payload" validate:"required"`
}

type UserAnswerHandledByServerEvent struct {
	Type    string                                `json:"type" validate:"required"`
	Payload UserAnswerHandledByServerEventPayload `json:"payload" validate:"required"`
}
