package schemas

type CreateP2PRoomPayload struct {
	UserID string `json:"userId" validate:"required"`
}

type RoomUpdatePayload struct {
	IsBlocked bool `json:"isBlocked" validate:"required"`
}

type RoomPopulatedResponse struct {
	RoomID    string            `json:"roomId" validate:"required"`
	Name      string            `json:"name" validate:"required"`
	Messages  []MessageResponse `json:"messages" validate:"required"`
	IsBlocked bool              `json:"isBlocked" validate:"required"`
}

type RoomPreviewResponse struct {
	RoomID    string `json:"roomId" validate:"required"`
	UserID    string `json:"userId" validate:"required"`
	Name      string `json:"name" validate:"required" extensions:"x-nullable"`
	IsBlocked bool   `json:"isBlocked" validate:"required"`
}

type GetRoomsResponse struct {
	Size  int                   `json:"size" validate:"required"`
	Rooms []RoomPreviewResponse `json:"rooms" validate:"required"`
}

type CreateMessagePayload struct {
	RoomID  string `json:"roomId" validate:"required"`
	Message string `json:"message" validate:"required"`
}

type MessageResponse struct {
	OwnerID string `json:"ownerId" validate:"required"`
	Message string `json:"message" validate:"required"`
}
