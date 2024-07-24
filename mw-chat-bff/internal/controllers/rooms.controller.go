package controllers

import (
	"fmt"
	"mw-chat-bff/internal/schemas"
	"mw-chat-bff/internal/services"
	util "mw-chat-bff/internal/utils"

	"net/http"

	"github.com/gin-gonic/gin"
)

type RoomsController struct {
	RoomsService services.IRoomsService
}

func NewRoomsController(roomService services.IRoomsService) *RoomsController {
	return &RoomsController{
		RoomsService: roomService,
	}
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
	response, err := cc.RoomsService.GetChatPreview(ctx)
	util.HandleErrorGin(ctx, err)

	ctx.JSON(http.StatusOK, &response)
}

// @Summary Get rooms for user
// @Description
// @Tags room
// @ID get-rooms
// @Accept  json
// @Produce  json
// @Param roomType path string true "room type: private, group"
// @Success 200 {object} schemas.GetRoomsResponse
// @Router /rooms/list/{roomType} [get]
func (cc *RoomsController) GetRooms(ctx *gin.Context) {
	roomType := ctx.Param("roomType")
	cc.RoomsService.GetRooms(ctx, roomType)
	ctx.JSON(http.StatusOK, &schemas.GetRoomsResponse{})
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
func (cc *RoomsController) GetRoomById(ctx *gin.Context) {
	roomId := ctx.Param("roomId")
	fmt.Println(roomId)

	cc.RoomsService.GetRoomById(ctx)
	ctx.JSON(http.StatusOK, &schemas.RoomPopulatedResponse{})
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
func (cc *RoomsController) CreateRoom(ctx *gin.Context) {
	// roomType := ctx.Param("roomType")

	var payload *schemas.CreateRoomPayload

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, &schemas.RoomPopulatedResponse{})
}

// @Summary Update room
// @Description
// @Tags room
// @ID update-room
// @Accept  json
// @Produce  json
// @Param roomId path string true "room Id"
// @Success 200 {object} schemas.RoomPopulatedResponse
// @Router /rooms/{roomId} [patch]
func (cc *RoomsController) UpdateRoom(ctx *gin.Context) {
	roomId := ctx.Param("roomId")
	fmt.Println(roomId)

	ctx.JSON(http.StatusOK, &schemas.RoomPopulatedResponse{})
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
func (cc *RoomsController) CreateMessage(ctx *gin.Context) {
	var payload *schemas.CreateMessagePayload

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	ctx.JSON(http.StatusOK, &schemas.MessageResponse{})
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
func (cc *RoomsController) AddUserToRoom(ctx *gin.Context) {
	roomId := ctx.Param("roomId")
	userId := ctx.Param("userId")
	fmt.Println(roomId, userId)

	ctx.JSON(http.StatusOK, &schemas.RoomPopulatedResponse{})
}

// @Summary Delete user from room
// @Description
// @Tags room
// @ID delete-user-from-room
// @Accept  json
// @Produce  json
// @Param roomId path string true "room Id"
// @Param userId path string true "user Id to delete"
// @Success 200 {object} schemas.RoomPopulatedResponse
// @Router /rooms/{roomId}/users/{userId} [delete]
func (cc *RoomsController) DeleteUserFromRoom(ctx *gin.Context) {
	roomId := ctx.Param("roomId")
	userId := ctx.Param("userId")
	fmt.Println(roomId, userId)

	ctx.JSON(http.StatusOK, &schemas.RoomPopulatedResponse{})
}
