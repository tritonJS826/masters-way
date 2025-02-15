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
	Users                []UserResponse `json:"users" validate:"required"`
	RoomID               string         `json:"roomId" validate:"required"`
	Name                 *string        `json:"name" validate:"required" extensions:"x-nullable"`
	RoomType             string         `json:"roomType" validate:"required"`
	IsBlocked            bool           `json:"isBlocked" validate:"required"`
	UnreadMessagesAmount int32          `json:"unreadMessagesAmount" validate:"required"`
}

type GetRoomsResponse struct {
	Size  int                   `json:"size" validate:"required"`
	Rooms []RoomPreviewResponse `json:"rooms" validate:"required"`
}

type FindOrCreateRoomResponse struct {
	Room             *RoomPopulatedResponse `json:"room" validate:"required"`
	IsAlreadyCreated bool                   `json:"isAlreadyCreated" validate:"required"`
}
