package schemas

type GetChatPreviewResponse struct {
	UnreadMessagesAmount int32 `json:"unreadMessagesAmount" validate:"required"`
}

type CreateRoomPayload struct {
	UserID   *string `json:"userId" validate:"required" extensions:"x-nullable"`
	Name     *string `json:"name" validate:"required" extensions:"x-nullable"`
	RoomType string  `json:"roomType" validate:"required"`
}

type RoomPopulatedResponse struct {
	RoomID    string            `json:"roomId" validate:"required"`
	Name      string            `json:"name" validate:"required"`
	Messages  []MessageResponse `json:"messages" validate:"required"`
	IsBlocked bool              `json:"isBlocked" validate:"required"`
	Users     []UserResponse    `json:"users" validate:"required"`
}

type UserResponse struct {
	UserID string `json:"userId" validate:"required"`
	Role   string `json:"role" validate:"required"`
}

type RoomPreviewResponse struct {
	RoomID    string         `json:"roomId" validate:"required"`
	Name      *string        `json:"name" validate:"required" extensions:"x-nullable"`
	IsBlocked bool           `json:"isBlocked" validate:"required"`
	Users     []UserResponse `json:"users" validate:"required"`
}

type GetRoomsResponse struct {
	Size  int32                 `json:"size" validate:"required"`
	Rooms []RoomPreviewResponse `json:"rooms" validate:"required"`
}

type CreateMessagePayload struct {
	Message string `json:"message" validate:"required"`
}

type MessageReaders struct {
	UserID   string `json:"userId" validate:"required"`
	ReadDate string `json:"readDate" validate:"required"`
}
type MessageResponse struct {
	OwnerID string           `json:"ownerId" validate:"required"`
	Message string           `json:"message" validate:"required"`
	Readers []MessageReaders `json:"messageReaders" validate:"required"`
}
