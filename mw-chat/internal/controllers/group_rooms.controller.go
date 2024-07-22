package controllers

import (
	"fmt"
	"mwchat/internal/schemas"
	"net/http"

	"github.com/gin-gonic/gin"
)

type GroupRoomsController struct {
}

func NewGroupRoomsController() *GroupRoomsController {
	return &GroupRoomsController{}
}

// @Summary Get group rooms preview for user
// @Description
// @Tags group
// @ID get-group-rooms
// @Accept  json
// @Produce  json
// @Success 200 {object} schemas.GetRoomsResponse
// @Router /group-rooms [get]
func (cc *GroupRoomsController) GetGroupRoomsPreview(ctx *gin.Context) {
	ctx.JSON(http.StatusOK, &schemas.GetRoomsResponse{})
}

// @Summary Get group room by id
// @Description
// @Tags group
// @ID get-group-room-by-id
// @Accept  json
// @Produce  json
// @Param groupRoomId path string true "group room Id"
// @Success 200 {object} schemas.RoomPopulatedResponse
// @Router /group-rooms/{groupRoomId} [get]
func (cc *GroupRoomsController) GetGroupRoomById(ctx *gin.Context) {
	groupRoomId := ctx.Param("groupRoomId")
	fmt.Println(groupRoomId)

	ctx.JSON(http.StatusOK, &schemas.RoomPopulatedResponse{})
}

// @Summary Create group rooms for user
// @Description
// @Tags group
// @ID create-group-rooms
// @Accept  json
// @Produce  json
// @Success 200 {object} schemas.RoomPopulatedResponse
// @Router /group-rooms [post]
func (cc *GroupRoomsController) CreateGroupRoom(ctx *gin.Context) {

	ctx.JSON(http.StatusOK, &schemas.RoomPopulatedResponse{})
}

// @Summary Update group rooms for user
// @Description
// @Tags group
// @ID update-group-rooms
// @Accept  json
// @Produce  json
// @Param groupRoomId path string true "group room Id"
// @Success 200 {object} schemas.RoomPopulatedResponse
// @Router /group-rooms/{groupRoomId} [patch]
func (cc *GroupRoomsController) UpdateGroupRoom(ctx *gin.Context) {
	groupRoomId := ctx.Param("groupRoomId")
	fmt.Println(groupRoomId)

	ctx.JSON(http.StatusOK, &schemas.RoomPopulatedResponse{})
}

// @Summary Add user to group room
// @Description
// @Tags group
// @ID add-user-to-group
// @Accept  json
// @Produce  json
// @Param groupRoomId path string true "group room Id"
// @Param userId path string true "user Id to delete"
// @Success 200 {object} schemas.RoomPopulatedResponse
// @Router /group-rooms/{groupRoomId}/users/{userId} [post]
func (cc *GroupRoomsController) AddUserToGroupRoom(ctx *gin.Context) {
	groupRoomId := ctx.Param("groupRoomId")
	userId := ctx.Param("userId")
	fmt.Println(groupRoomId, userId)

	ctx.JSON(http.StatusOK, &schemas.RoomPopulatedResponse{})
}

// @Summary Delete user to group room
// @Description
// @Tags group
// @ID delete-user-to-group
// @Accept  json
// @Produce  json
// @Param groupRoomId path string true "group room Id"
// @Param userId path string true "user Id to delete"
// @Success 200 {object} schemas.RoomPopulatedResponse
// @Router /group-rooms/{groupRoomId}/users/{userId} [delete]
func (cc *GroupRoomsController) DeleteUserFromGroupRoom(ctx *gin.Context) {
	groupRoomId := ctx.Param("groupRoomId")
	userId := ctx.Param("userId")
	fmt.Println(groupRoomId, userId)

	ctx.JSON(http.StatusOK, &schemas.RoomPopulatedResponse{})
}

// @Summary Get requests to group room
// @Description
// @Tags group
// @ID get-requests-to-group-room
// @Accept  json
// @Produce  json
// @Success 200 {object} schemas.GetRequestsToGroupRoomResponse
// @Router /group-rooms/requests [get]
func (cc *GroupRoomsController) GetRequestsToGroupRoom(ctx *gin.Context) {
	ctx.JSON(http.StatusOK, &schemas.GetRequestsToGroupRoomResponse{})
}

// @Summary Create requests to group room
// @Description
// @Tags group
// @ID create-requests-to-group-room
// @Accept  json
// @Produce  json
// @Param request body schemas.CreateRequestToGroupRoomPayload true "query params"
// @Success 204
// @Router /group-rooms/requests [post]
func (cc *GroupRoomsController) CreateRequestsToGroupRoom(ctx *gin.Context) {
	var payload *schemas.CreateRequestToGroupRoomPayload

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	ctx.Status(http.StatusNoContent)
}

// @Summary Accept request to group room
// @Description
// @Tags group
// @ID accept-request-to-group-room
// @Accept  json
// @Produce  json
// @Param groupRoomId path string true "groupRoom Id to accept request"
// @Success 200 {object} schemas.RoomPopulatedResponse
// @Router /group-rooms/{groupRoomId}/requests/accept [post]
func (cc *GroupRoomsController) AcceptRequestsToGroupRoom(ctx *gin.Context) {
	groupRoomId := ctx.Param("groupRoomId")
	fmt.Println(groupRoomId)

	ctx.JSON(http.StatusOK, &schemas.RoomPopulatedResponse{})
}

// @Summary Decline request to group room
// @Description
// @Tags group
// @ID decline-request-to-group-room
// @Accept  json
// @Produce  json
// @Param groupRoomId path string true "groupRoom Id to delete request"
// @Success 200 {object} schemas.DeclineRequestToGroupRoomResponse
// @Router /group-rooms/{groupRoomId}/requests/decline [delete]
func (cc *GroupRoomsController) DeclineRequestsToGroupRoom(ctx *gin.Context) {
	groupRoomId := ctx.Param("groupRoomId")
	fmt.Println(groupRoomId)

	ctx.JSON(http.StatusOK, &schemas.DeclineRequestToGroupRoomResponse{})
}

// @Summary Create message to group room
// @Description
// @Tags group
// @ID create-message-in-group-room
// @Accept  json
// @Produce  json
// @Param request body schemas.CreateMessagePayload true "query params"
// @Param groupRoomId path string true "group room Id"
// @Success 200 {object} schemas.MessageResponse
// @Router /group-rooms/{groupRoomId}/messages [post]
func (cc *GroupRoomsController) CreateMessageInGroupRoom(ctx *gin.Context) {
	var payload *schemas.CreateMessagePayload

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	ctx.JSON(http.StatusOK, &schemas.MessageResponse{})
}
