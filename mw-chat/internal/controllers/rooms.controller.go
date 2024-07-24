package controllers

import (
	"mwchat/internal/auth"
	"mwchat/internal/schemas"
	"mwchat/internal/services"
	util "mwchat/internal/utils"
	"mwchat/pkg/utils"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/jackc/pgx/v5/pgtype"
)

type RoomsController struct {
	RoomService services.RoomService
}

func NewP2PRoomsController(RoomService services.RoomService) *RoomsController {
	return &RoomsController{RoomService: RoomService}
}

// @Summary Get chat preview
// @Description
// @Tags room
// @ID get-chat preview
// @Accept  json
// @Produce  json
// @Success 200 {object} schemas.GetChatPreviewResponse
// @Router /rooms/preview [get]
func (cc *RoomsController) GetChatPreview(ctx *gin.Context) {
	userIDRaw, _ := ctx.Get(auth.ContextKeyUserID)
	userUUID := pgtype.UUID{Bytes: uuid.MustParse(userIDRaw.(string)), Valid: true}

	chatPreview, err := cc.RoomService.GetChatPreview(ctx, userUUID)
	util.HandleErrorGin(ctx, err)

	ctx.JSON(http.StatusOK, &chatPreview)
}

// @Summary Get rooms for user
// @Description
// @Tags room
// @ID get-rooms
// @Accept  json
// @Produce  json
// @Param roomType path string true "room type: private | group"
// @Success 200 {object} schemas.GetRoomsResponse
// @Router /rooms/list/{roomType} [get]
func (pc *RoomsController) GetRooms(ctx *gin.Context) {
	roomType := ctx.Param("/:roomType")
	userIDRaw, _ := ctx.Get(auth.ContextKeyUserID)
	userUUID := uuid.MustParse(userIDRaw.(string))

	p2pRooms, err := pc.RoomService.GetRooms(ctx, userUUID, roomType)
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
func (pc *RoomsController) GetRoomById(ctx *gin.Context) {
	roomId := ctx.Param("/:roomId")
	roomUUID := uuid.MustParse(roomId)

	userIDRaw, _ := ctx.Get(auth.ContextKeyUserID)
	userUUID := uuid.MustParse(userIDRaw.(string))

	p2pRoom, err := pc.RoomService.GetRoomByUuid(ctx, userUUID, roomUUID)
	utils.HandleErrorGin(ctx, err)

	ctx.JSON(http.StatusOK, p2pRoom)
}

// @Summary Create room for user
// @Description
// @Tags room
// @ID create-room
// @Accept  json
// @Produce  json
// @Param roomType path string true "room type: private, group"
// @Success 200 {object} schemas.RoomPopulatedResponse
// @Router /rooms [post]
func (pc *RoomsController) CreateRoom(ctx *gin.Context) {
	// var payload *schemas.CreateP2PRoomPayload

	// if err := ctx.ShouldBindJSON(&payload); err != nil {
	// 	ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	// 	return
	// }

	// invitingUserIDRaw, _ := ctx.Get(auth.ContextKeyUserID)
	// invitingUserUUID := uuid.MustParse(invitingUserIDRaw.(string))

	// invitedUserUUID := uuid.MustParse(payload.UserID)

	// newP2PRoom, err := pc.P2PService.CreateP2PRoom(ctx, invitingUserUUID, invitedUserUUID)
	// utils.HandleErrorGin(ctx, err)

	// ctx.JSON(http.StatusOK, newP2PRoom)

	ctx.JSON(http.StatusOK, &schemas.RoomPopulatedResponse{})
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
func (pc *RoomsController) UpdateRoom(ctx *gin.Context) {
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

// @Summary Create message in room
// @Description
// @Tags room
// @ID make-message-in-room
// @Accept  json
// @Produce  json
// @Param request body schemas.CreateMessagePayload true "query params"
// @Param roomId path string true "room Id"
// @Success 200 {object} schemas.MessageResponse
// @Router /rooms/create-message{roomId}/messages [post]
func (pc *RoomsController) CreateMessage(ctx *gin.Context) {
	// var payload *schemas.CreateMessagePayload

	// if err := ctx.ShouldBindJSON(&payload); err != nil {
	// 	ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	// 	return
	// }

	// userIDRaw, _ := ctx.Get(auth.ContextKeyUserID)
	// userUUID := uuid.MustParse(userIDRaw.(string))

	// params := &services.RoomMessageParams{
	// 	OwnerUUID: userUUID,
	// 	RoomUUID:  uuid.MustParse(payload.RoomID),
	// 	Text:      payload.Message,
	// }

	// message, err := pc.RoomService.CreateMessageInP2PRoom(ctx, params)
	// utils.HandleErrorGin(ctx, err)

	// ctx.JSON(http.StatusOK, message)
}

// @Summary Add user to room
// @Description
// @Tags room
// @ID add-user-to-room
// @Accept  json
// @Produce  json
// @Param roomId path string true "room Id"
// @Param userId path string true "user Id to delete"
// @Success 200 {object} schemas.RoomPopulatedResponse
// @Router /rooms/add-user/{roomId}/users/{userId} [post]
func (pc *RoomsController) AddUserToRoom(ctx *gin.Context) {
	// groupRoomId := ctx.Param("groupRoomId")
	// userId := ctx.Param("userId")
	// fmt.Println(groupRoomId, userId)

	ctx.JSON(http.StatusOK, &schemas.RoomPopulatedResponse{})
}

// @Summary Delete user from room
// @Description
// @Tags room
// @ID delete-user-to-group
// @Accept  json
// @Produce  json
// @Param roomId path string true "room Id"
// @Param userId path string true "user Id to delete"
// @Success 200 {object} schemas.RoomPopulatedResponse
// @Router /group-rooms/{roomId}/users/{userId} [delete]
func (pc *RoomsController) DeleteUserFromRoom(ctx *gin.Context) {
	// groupRoomId := ctx.Param("roomId")
	// userId := ctx.Param("userId")
	// fmt.Println(groupRoomId, userId)

	ctx.JSON(http.StatusOK, &schemas.RoomPopulatedResponse{})
}
