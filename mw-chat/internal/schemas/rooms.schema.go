package schemas

type GetChatPreviewResponse struct {
	UnreadMessagesAmount int `json:"unreadMessagesAmount" validate:"required"`
}

type CreateRoomPayload struct {
	UserID   *string `json:"userId" extensions:"x-nullable"`
	Name     *string `json:"name" extensions:"x-nullable"`
	RoomType string  `json:"roomType" validate:"required"`
}

type RoomUpdatePayload struct {
	IsBlocked *bool `json:"isBlocked" validate:"required" extensions:"x-nullable"`
}

type UserResponse struct {
	UserID string `json:"userId" validate:"required"`
	Role   string `json:"role" validate:"required"`
}

type RoomPopulatedResponse struct {
	RoomID    string            `json:"roomId" validate:"required"`
	Name      *string           `json:"name" validate:"required" extensions:"x-nullable"`
	RoomType  string            `json:"roomType" validate:"required"`
	IsBlocked bool              `json:"isBlocked" validate:"required"`
	Users     []UserResponse    `json:"users" validate:"required"`
	Messages  []MessageResponse `json:"messages" validate:"required"`
}

type RoomPreviewResponse struct {
	RoomID    string         `json:"roomId" validate:"required"`
	Name      string         `json:"name" validate:"required" extensions:"x-nullable"`
	RoomType  string         `json:"roomType" validate:"required"`
	IsBlocked bool           `json:"isBlocked" validate:"required"`
	Users     []UserResponse `json:"users" validate:"required"`
}

type GetRoomsResponse struct {
	Size  int                   `json:"size" validate:"required"`
	Rooms []RoomPreviewResponse `json:"rooms" validate:"required"`
}

type CreateMessagePayload struct {
	Message string `json:"message" validate:"required"`
}

type MessageReader struct {
	UserID   string `json:"userId" validate:"required"`
	ReadDate string `json:"readDate" validate:"required"`
}

type MessageResponse struct {
	OwnerID string          `json:"ownerId" validate:"required"`
	Message string          `json:"message" validate:"required"`
	Readers []MessageReader `json:"messageReaders" validate:"required"`
}

type CreateMessageResponse struct {
	Users   []string        `json:"users" validate:"required"`
	Message MessageResponse `json:"message" validate:"required"`
}
