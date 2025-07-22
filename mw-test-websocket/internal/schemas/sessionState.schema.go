package schemas

type UserInfo struct {
	UserUuid string `json:"userUuid" validate:"required"`
}

type UserJoinedSessionEventResponse struct {
	CurrentUsers []UserInfo `json:"currentUsers" validate:"required"`
	UserHostUuid string     `json:"userHostUuid" validate:"required"`
}
