package services

type GroupRoomsService struct {
}

func NewGroupRoomsService() *GroupRoomsService {
	return &GroupRoomsService{}
}

func (cc *GroupRoomsService) GetGroupRoomsPreview() {
	// ctx.JSON(http.StatusOK, &schemas.GetRoomsResponse{})
}

func (cc *GroupRoomsService) GetGroupRoomById() {
	// groupRoomId := ctx.Param("groupRoomId")
	// fmt.Println(groupRoomId)

	// ctx.JSON(http.StatusOK, &schemas.RoomPopulatedResponse{})
}

func (cc *GroupRoomsService) CreateGroupRoom() {

	// ctx.JSON(http.StatusOK, &schemas.RoomPopulatedResponse{})
}

func (cc *GroupRoomsService) UpdateGroupRoom() {
	// groupRoomId := ctx.Param("groupRoomId")
	// fmt.Println(groupRoomId)

	// ctx.JSON(http.StatusOK, &schemas.RoomPopulatedResponse{})
}

func (cc *GroupRoomsService) AddUserToGroupRoom() {
	// groupRoomId := ctx.Param("groupRoomId")
	// userId := ctx.Param("userId")
	// fmt.Println(groupRoomId, userId)

	// ctx.JSON(http.StatusOK, &schemas.RoomPopulatedResponse{})
}

func (cc *GroupRoomsService) DeleteUserFromGroupRoom() {
	// groupRoomId := ctx.Param("groupRoomId")
	// userId := ctx.Param("userId")
	// fmt.Println(groupRoomId, userId)

	// ctx.JSON(http.StatusOK, &schemas.RoomPopulatedResponse{})
}

func (cc *GroupRoomsService) GetRequestsToGroupRoom() {
	// ctx.JSON(http.StatusOK, &schemas.GetRequestsToGroupRoomResponse{})
}

func (cc *GroupRoomsService) CreateRequestsToGroupRoom() {
	// var payload *schemas.CreateRequestToGroupRoomPayload

	// if err := ctx.ShouldBindJSON(&payload); err != nil {
	// 	ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	// 	return
	// }
	// ctx.Status(http.StatusNoContent)
}

func (cc *GroupRoomsService) AcceptRequestsToGroupRoom() {
	// groupRoomId := ctx.Param("groupRoomId")
	// fmt.Println(groupRoomId)

	// ctx.JSON(http.StatusOK, &schemas.RoomPopulatedResponse{})
}

func (cc *GroupRoomsService) DeclineRequestsToGroupRoom() {
	// groupRoomId := ctx.Param("groupRoomId")
	// fmt.Println(groupRoomId)

	// ctx.JSON(http.StatusOK, &schemas.DeclineRequestToGroupRoomResponse{})
}

func (cc *GroupRoomsService) CreateMessageInGroupRoom() {
	// var payload *schemas.CreateMessagePayload

	// if err := ctx.ShouldBindJSON(&payload); err != nil {
	// 	ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	// 	return
	// }
	// ctx.JSON(http.StatusOK, &schemas.MessageResponse{})
}
