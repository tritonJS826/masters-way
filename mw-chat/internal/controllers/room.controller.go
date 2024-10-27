package controllers

import (
	"mwchat/internal/auth"
	"mwchat/internal/schemas"
	"mwchat/internal/services"
	"mwchat/pkg/utils"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

type RoomController struct {
	roomService *services.RoomsService
}

func NewRoomsController(roomService *services.RoomsService) *RoomController {
	return &RoomController{roomService}
}

// @Summary Get chat preview
// @Description
// @Tags room
// @ID get-chat preview
// @Accept  json
// @Produce  json
// @Success 200 {object} schemas.GetChatPreviewResponse
// @Router /rooms/preview [get]
func (rc *RoomController) GetChatPreview(ctx *gin.Context) {
	userIDRaw, _ := ctx.Get(auth.ContextKeyUserID)
	userUUID := uuid.MustParse(userIDRaw.(string))

	chatPreview, err := rc.roomService.GetChatPreview(ctx, userUUID)
	utils.HandleErrorGin(ctx, err)

	ctx.JSON(http.StatusOK, chatPreview)
}

// @Summary Get rooms for user
// @Description
// @Tags room
// @ID get-rooms
// @Accept  json
// @Produce  json
// @Param roomType path string true "room type: private | group" Enums(private, group)
// @Success 200 {object} schemas.GetRoomsResponse
// @Router /rooms/list/{roomType} [get]
func (pc *RoomController) GetRooms(ctx *gin.Context) {
	roomType := ctx.Param("roomType")
	userIDRaw, _ := ctx.Get(auth.ContextKeyUserID)
	userUUID := uuid.MustParse(userIDRaw.(string))

	p2pRooms, err := pc.roomService.GetRooms(ctx, userUUID, roomType)
	utils.HandleErrorGin(ctx, err)

	ctx.JSON(http.StatusOK, p2pRooms)
}

// @Summary Get room by id
// @Description
// @Tags room
// @ID get-room-by-id
// @Accept  json
// @Produce  json
// @Param roomId path string true "room Id"
// @Success 200 {object} schemas.RoomPopulatedResponse
// @Router /rooms/{roomId} [get]
func (rc *RoomController) GetRoomById(ctx *gin.Context) {
	roomId := ctx.Param("roomId")
	roomUUID := uuid.MustParse(roomId)

	userIDRaw, _ := ctx.Get(auth.ContextKeyUserID)
	userUUID := uuid.MustParse(userIDRaw.(string))

	room, err := rc.roomService.GetRoomByUuid(ctx, userUUID, roomUUID)
	utils.HandleErrorGin(ctx, err)

	ctx.JSON(http.StatusOK, room)
}

// @Summary Create room for user
// @Description
// @Tags room
// @ID create-room
// @Accept  json
// @Produce  json
// @Param request body schemas.CreateRoomPayload true "query params"
// @Success 200 {object} schemas.RoomPopulatedResponse
// @Router /rooms [post]
func (rc *RoomController) CreateRoom(ctx *gin.Context) {
	var payload *schemas.CreateRoomPayload

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	creatorIDRaw, _ := ctx.Get(auth.ContextKeyUserID)
	creatorUUID := uuid.MustParse(creatorIDRaw.(string))

	params := &services.CreateRoomServiceParams{
		CreatorUUID:     creatorUUID,
		InvitedUserUUID: payload.UserID,
		Name:            payload.Name,
		Type:            payload.RoomType,
	}
	newP2PRoom, err := rc.roomService.CreateRoom(ctx, params)
	utils.HandleErrorGin(ctx, err)

	ctx.JSON(http.StatusOK, newP2PRoom)
}

// @Summary Update room for user
// @Description
// @Tags room
// @ID update-room
// @Accept  json
// @Produce  json
// @Param roomId path string true "room Id"
// @Success 200 {object} schemas.RoomPopulatedResponse
// @Router /rooms/{roomId} [patch]
func (rc *RoomController) UpdateRoom(ctx *gin.Context) {
	// var payload *schemas.RoomUpdatePayload

	// if err := ctx.ShouldBindJSON(&payload); err != nil {
	// 	ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	// 	return
	// }

	// p2pRoomId := ctx.Param("p2pRoomId")
	// p2pRoomUUID := uuid.MustParse(p2pRoomId)

	// userIDRaw, _ := ctx.Get(auth.ContextKeyUserID)
	// userUUID := uuid.MustParse(userIDRaw.(string))

	// if payload.IsBlocked != nil {
	// 	params := &services.BlockOrUnblockRoomParams{
	// 		UserUUID:  userUUID,
	// 		RoomUUID:  p2pRoomUUID,
	// 		IsBlocked: *payload.IsBlocked,
	// 	}

	// 	err := pc.RoomService.BlockOrUnblockP2PRoom(ctx, params)
	// 	utils.HandleErrorGin(ctx, err)

	// 	p2pRoom, err := pc.RoomService.GetPopulatedP2PRoom(ctx, p2pRoomUUID, userUUID)
	// 	utils.HandleErrorGin(ctx, err)

	// 	ctx.JSON(http.StatusOK, p2pRoom)
	// }

	// ctx.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request: all parameters are null."})
	return
}

// @Summary Add user to room
// @Description
// @Tags room
// @ID add-user-to-room
// @Accept  json
// @Produce  json
// @Param roomId path string true "room Id"
// @Param userId path string true "user Id to delete"
// @Success 200 {object} schemas.RoomPreviewResponse
// @Router /rooms/{roomId}/users/{userId} [post]
func (rc *RoomController) AddUserToRoom(ctx *gin.Context) {
	// groupRoomId := ctx.Param("groupRoomId")
	// userId := ctx.Param("userId")
	// fmt.Println(groupRoomId, userId)

	ctx.JSON(http.StatusOK, &schemas.RoomPreviewResponse{})
}

// @Summary Delete user from room
// @Description
// @Tags room
// @ID delete-user-from-room
// @Accept  json
// @Produce  json
// @Param roomId path string true "room Id"
// @Param userId path string true "user Id to delete"
// @Success 200
// @Router /rooms/{roomId}/users/{userId} [delete]
func (rc *RoomController) DeleteUserFromRoom(ctx *gin.Context) {
	// groupRoomId := ctx.Param("roomId")
	// userId := ctx.Param("userId")
	// fmt.Println(groupRoomId, userId)

	ctx.Status(http.StatusOK)
}
