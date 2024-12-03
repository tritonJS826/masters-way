package schemas

type GetRoomPreviewResponse struct {
	UnreadMessagesAmount int32 `json:"unreadMessagesAmount" validate:"required"`
}

type CreateRoomPayload struct {
	UserID   *string `json:"userId" extensions:"x-nullable"`
	Name     *string `json:"name" extensions:"x-nullable"`
	RoomType string  `json:"roomType" validate:"required"`
}

type RoomPopulatedResponse struct {
	RoomID    string            `json:"roomId" validate:"required"`
	Name      string            `json:"name" validate:"required"`
	ImageURL  string            `json:"imageUrl" validate:"required"`
	RoomType  string            `json:"roomType" validate:"required"`
	IsBlocked bool              `json:"isBlocked" validate:"required"`
	Users     []UserResponse    `json:"users" validate:"required"`
	Messages  []MessageResponse `json:"messages" validate:"required"`
}

type UserResponse struct {
	UserID   string `json:"userId" validate:"required"`
	Name     string `json:"name" validate:"required"`
	ImageURL string `json:"imageUrl" validate:"required"`
	Role     string `json:"role" validate:"required"`
}

type RoomPreviewResponse struct {
	RoomID    string         `json:"roomId" validate:"required"`
	Name      string         `json:"name" validate:"required"`
	ImageURL  string         `json:"imageUrl" validate:"required"`
	RoomType  string         `json:"roomType" validate:"required"`
	IsBlocked bool           `json:"isBlocked" validate:"required"`
	Users     []UserResponse `json:"users" validate:"required"`
}

type GetRoomsResponse struct {
	Size  int32                 `json:"size" validate:"required"`
	Rooms []RoomPreviewResponse `json:"rooms" validate:"required"`
}

type FindOrCreateRoomResponse struct {
	Room             *RoomPopulatedResponse `json:"room" validate:"required"`
	IsAlreadyCreated bool                   `json:"isAlreadyCreated" validate:"required"`
}
