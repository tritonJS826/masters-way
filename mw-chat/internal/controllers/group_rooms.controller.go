package controllers

import (
	"fmt"
	"mwchat/internal/auth"
	"mwchat/internal/schemas"
	"mwchat/internal/services"
	"mwchat/pkg/utils"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

type GroupRoomsController struct {
	GroupService services.GroupService
}

func NewGroupRoomsController(GroupService services.GroupService) *GroupRoomsController {
	return &GroupRoomsController{GroupService}
}

// @Summary Get group rooms preview for user
// @Description
// @Tags group
// @ID get-group-rooms
// @Accept  json
// @Produce  json
// @Success 200 {object} schemas.GetRoomsResponse
// @Router /group-rooms [get]
func (groupRoomsController *GroupRoomsController) HandleGetGroupRooms(ctx *gin.Context) {
	userIDRaw, _ := ctx.Get(auth.ContextKeyUserID)
	userUUID := uuid.MustParse(userIDRaw.(string))

	groupRooms, err := groupRoomsController.GroupService.GetGroupRoomsPreview(ctx, userUUID)
	utils.HandleErrorGin(ctx, err)

	ctx.JSON(http.StatusOK, groupRooms)
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
func (groupRoomsController *GroupRoomsController) HandleGetGroupRoomById(ctx *gin.Context) {
	groupRoomId := ctx.Param("groupRoomId")
	groupRoomUUID := uuid.MustParse(groupRoomId)

	userIDRaw, _ := ctx.Get(auth.ContextKeyUserID)
	userUUID := uuid.MustParse(userIDRaw.(string))

	groupRoom, err := groupRoomsController.GroupService.GetPopulatedGroupRoom(ctx, userUUID, groupRoomUUID)
	utils.HandleErrorGin(ctx, err)

	ctx.JSON(http.StatusOK, groupRoom)
}

// @Summary Create group rooms for user
// @Description
// @Tags group
// @ID create-group-rooms
// @Accept  json
// @Produce  json
// @Param request body schemas.CreateRoomPayload true "query params"
// @Success 200 {object} schemas.RoomPopulatedResponse
// @Router /group-rooms [post]
func (groupRoomsController *GroupRoomsController) HandleCreateGroupRoom(ctx *gin.Context) {
	// var payload *schemas.CreateGroupRoomPayload

	// if err := ctx.ShouldBindJSON(&payload); err != nil {
	// 	ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	// 	return
	// }

	// userIDRaw, _ := ctx.Get(auth.ContextKeyUserID)
	// userUUID := uuid.MustParse(userIDRaw.(string))

	// newGroupRoom, err := groupRoomsController.GroupService.CreateGroupRoom(ctx, payload.Name, userUUID)
	// utils.HandleErrorGin(ctx, err)

	// ctx.JSON(http.StatusOK, newGroupRoom)
	ctx.JSON(http.StatusOK, &schemas.RoomPopulatedResponse{})
}

// @Summary Update group rooms for user
// @Description
// @Tags group
// @ID update-group-rooms
// @Accept  json
// @Produce  json
// @Param request body schemas.RoomUpdatePayload true "query params"
// @Param groupRoomId path string true "group room Id"
// @Success 200 {object} schemas.RoomPopulatedResponse
// @Router /group-rooms/{groupRoomId} [patch]
func (groupRoomsController *GroupRoomsController) HandleUpdateGroupRoom(ctx *gin.Context) {
	var payload *schemas.RoomUpdatePayload

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	groupRoomId := ctx.Param("groupRoomId")
	groupRoomUUID := uuid.MustParse(groupRoomId)

	userIDRaw, _ := ctx.Get(auth.ContextKeyUserID)
	userUUID := uuid.MustParse(userIDRaw.(string))

	if payload.IsBlocked != nil {
		params := &services.BlockOrUnblockRoomParams{
			UserUUID:  userUUID,
			RoomUUID:  groupRoomUUID,
			IsBlocked: *payload.IsBlocked,
		}

		err := groupRoomsController.GroupService.BlockOrUnblockGroupRoom(ctx, params)
		utils.HandleErrorGin(ctx, err)

		groupRoom, err := groupRoomsController.GroupService.GetPopulatedGroupRoom(ctx, groupRoomUUID, userUUID)
		utils.HandleErrorGin(ctx, err)

		ctx.JSON(http.StatusOK, groupRoom)
	}

	ctx.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request: all parameters are null."})
	return
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
func (groupRoomsController *GroupRoomsController) HandleAddUserToGroupRoom(ctx *gin.Context) {
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
func (groupRoomsController *GroupRoomsController) HandleDeleteUserFromGroupRoom(ctx *gin.Context) {
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
func (groupRoomsController *GroupRoomsController) HandleGetRequestsToGroupRoom(ctx *gin.Context) {
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
func (groupRoomsController *GroupRoomsController) HandleCreateRequestsToGroupRoom(ctx *gin.Context) {
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
func (groupRoomsController *GroupRoomsController) HandleAcceptRequestsToGroupRoom(ctx *gin.Context) {
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
func (groupRoomsController *GroupRoomsController) HandleDeclineRequestsToGroupRoom(ctx *gin.Context) {
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
func (groupRoomsController *GroupRoomsController) HandleCreateMessageInGroupRoom(ctx *gin.Context) {
	var payload *schemas.CreateMessagePayload

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	ctx.JSON(http.StatusOK, &schemas.MessageResponse{})
}
