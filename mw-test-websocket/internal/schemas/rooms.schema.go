package schemas

type RoomPopulatedResponse struct {
	RoomID               string            `json:"roomId" validate:"required"`
	Name                 string            `json:"name" validate:"required"`
	ImageURL             string            `json:"imageUrl" validate:"required"`
	RoomType             string            `json:"roomType" validate:"required"`
	Users                []UserResponse    `json:"users" validate:"required"`
	Messages             []MessageResponse `json:"messages" validate:"required"`
	UnreadMessagesAmount int               `json:"unreadMessagesAmount" validate:"required"`
}

type UserResponse struct {
	UserID   string `json:"userId" validate:"required"`
	Name     string `json:"name" validate:"required"`
	ImageURL string `json:"imageUrl" validate:"required"`
	Role     string `json:"role" validate:"required"`
}
