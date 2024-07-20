package schemas

type GetRequestsToGroupRoomResponse struct {
	Requests []RequestToGroupRoom `json:"requests" validate:"required"`
}

type RequestToGroupRoom struct {
	SenderID string `json:"senderId" validate:"required"`
	RoomID   string `json:"roomId" validate:"required"`
}

type CreateRequestToGroupRoomPayload struct {
	RoomID string `json:"roomId" validate:"required"`
	UserID string `json:"userId" validate:"required"`
}

type DeclineRequestToGroupRoomResponse struct {
	RoomID string `json:"roomId" validate:"required"`
}
