package controllers

import (
	"fmt"
	"mw-chat-bff/internal/auth"
	"mw-chat-bff/internal/schemas"
	"mw-chat-bff/internal/services"
	util "mw-chat-bff/internal/utils"

	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/samber/lo"
)

const RoomTypePrivate string = "private"
const RoomTypeGroup string = "group"

type RoomsController struct {
	roomsService           services.IRoomsService
	usersService           services.IUsersService
	mwChatWebSocketService services.IMWChatWebSocketService
}

func NewRoomsController(
	roomsService services.IRoomsService,
	usersService services.IUsersService,
	mwChatWebSocketService services.IMWChatWebSocketService,
) *RoomsController {
	return &RoomsController{
		roomsService,
		usersService,
		mwChatWebSocketService,
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
	chatPreview, err := cc.roomsService.GetChatPreview(ctx)
	util.HandleErrorGin(ctx, err)

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
func (cc *RoomsController) GetRooms(ctx *gin.Context) {
	roomType := ctx.Param("roomType")

	rooms, err := cc.roomsService.GetRooms(ctx, roomType)
	util.HandleErrorGin(ctx, err)

	userIDsFromAllRooms := lo.FlatMap(rooms.Rooms, func(room schemas.RoomPreviewResponse, _ int) []string {
		return lo.Map(room.Users, func(roomUser schemas.UserResponse, _ int) string {
			return roomUser.UserID
		})
	})

	populatedUserMap, err := cc.usersService.GetChatUsers(ctx, userIDsFromAllRooms)
	util.HandleErrorGin(ctx, err)

	rooms.Rooms = lo.Map(rooms.Rooms, func(room schemas.RoomPreviewResponse, _ int) schemas.RoomPreviewResponse {
		room.Users = lo.Map(room.Users, func(user schemas.UserResponse, _ int) schemas.UserResponse {
			populatedUser, ok := populatedUserMap[user.UserID]
			if !ok {
				util.HandleErrorGin(ctx, fmt.Errorf("User with ID %s not found in the general service", user.UserID))
			}

			user.Name = populatedUser.Name
			user.ImageURL = populatedUser.ImageURL

			return user
		})

		if room.RoomType == RoomTypePrivate {
			room.Name, err = getPrivateRoomName(ctx, room.Users)
			util.HandleErrorGin(ctx, err)
		}

		return room
	})

	ctx.JSON(http.StatusOK, rooms)
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

	room, err := cc.roomsService.GetRoomById(ctx, roomId)
	util.HandleErrorGin(ctx, err)

	userIDs := lo.Map(room.Users, func(user schemas.UserResponse, _ int) string {
		return user.UserID
	})

	populatedUserMap, err := cc.usersService.GetChatUsers(ctx, userIDs)
	util.HandleErrorGin(ctx, err)

	room.Users = lo.Map(room.Users, func(user schemas.UserResponse, _ int) schemas.UserResponse {
		populatedUser, ok := populatedUserMap[user.UserID]
		if !ok {
			util.HandleErrorGin(ctx, fmt.Errorf("User with ID %s not found in the general service", user.UserID))
		}

		user.Name = populatedUser.Name
		user.ImageURL = populatedUser.ImageURL
		return user
	})

	room.Messages = lo.Map(room.Messages, func(message schemas.MessageResponse, _ int) schemas.MessageResponse {
		if populatedUser, ok := populatedUserMap[message.OwnerID]; ok {
			message.OwnerName = populatedUser.Name
			message.OwnerImageURL = populatedUser.ImageURL
		}
		return message
	})

	if room.RoomType == RoomTypePrivate {
		room.Name, err = getPrivateRoomName(ctx, room.Users)
		util.HandleErrorGin(ctx, err)
	}

	ctx.JSON(http.StatusOK, &room)
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
func (cc *RoomsController) CreateRoom(ctx *gin.Context) {
	var payload *schemas.CreateRoomPayload

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	room, err := cc.roomsService.CreateRoom(ctx, payload)
	util.HandleErrorGin(ctx, err)

	userIDs := lo.Map(room.Users, func(user schemas.UserResponse, _ int) string {
		return user.UserID
	})

	populatedUserMap, err := cc.usersService.GetChatUsers(ctx, userIDs)
	util.HandleErrorGin(ctx, err)

	room.Users = lo.Map(room.Users, func(user schemas.UserResponse, _ int) schemas.UserResponse {
		populatedUser, ok := populatedUserMap[user.UserID]
		if !ok {
			util.HandleErrorGin(ctx, fmt.Errorf("User with ID %s not found in the general service", user.UserID))
		}

		user.Name = populatedUser.Name
		user.ImageURL = populatedUser.ImageURL
		return user
	})

	if room.RoomType == RoomTypePrivate {
		room.Name, err = getPrivateRoomName(ctx, room.Users)
		util.HandleErrorGin(ctx, err)
	}

	ctx.JSON(http.StatusOK, &room)
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

	room, err := cc.roomsService.UpdateRoom(ctx, roomId)
	util.HandleErrorGin(ctx, err)

	ctx.JSON(http.StatusOK, &room)
}

// @Summary Create message in room
// @Description
// @Tags room
// @ID create-message-in-room
// @Accept  json
// @Produce  json
// @Param request body schemas.CreateMessagePayload true "query params"
// @Param roomId path string true "room Id"
// @Success 200 {object} schemas.MessageResponse
// @Router /rooms/{roomId}/messages [post]
func (cc *RoomsController) CreateMessage(ctx *gin.Context) {
	var payload *schemas.CreateMessagePayload

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	roomId := ctx.Param("roomId")

	message, err := cc.roomsService.CreateMessage(ctx, payload.Message, roomId)
	util.HandleErrorGin(ctx, err)

	userIDs := make([]string, len(message.Readers)+1)
	for i, reader := range message.Readers {
		userIDs[i] = reader.UserID
	}
	userIDs[len(userIDs)-1] = message.OwnerID

	populatedUserMap, err := cc.usersService.GetChatUsers(ctx, userIDs)
	util.HandleErrorGin(ctx, err)

	if populatedUser, ok := populatedUserMap[message.OwnerID]; ok {
		message.OwnerName = populatedUser.Name
		message.OwnerImageURL = populatedUser.ImageURL
	}

	populatedUser, ok := populatedUserMap[message.OwnerID]
	if !ok {
		util.HandleErrorGin(ctx, fmt.Errorf("User with ID %s not found in the general service", message.OwnerID))
	}

	message.OwnerName = populatedUser.Name
	message.OwnerImageURL = populatedUser.ImageURL

	message.Readers = lo.Map(message.Readers, func(reader schemas.MessageReader, _ int) schemas.MessageReader {
		if populatedUser, ok := populatedUserMap[reader.UserID]; ok {
			reader.Name = populatedUser.Name
			reader.ImageURL = populatedUser.ImageURL
		}
		return reader
	})

	err = cc.mwChatWebSocketService.GetChatUsers(ctx, roomId, message)
	util.HandleErrorGin(ctx, err)

	ctx.JSON(http.StatusOK, &message)
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
// @Router /rooms/{roomId}/users/{userId} [post]
func (cc *RoomsController) AddUserToRoom(ctx *gin.Context) {
	roomId := ctx.Param("roomId")
	userId := ctx.Param("userId")

	room, err := cc.roomsService.AddUserToRoom(ctx, roomId, userId)
	util.HandleErrorGin(ctx, err)

	ctx.JSON(http.StatusOK, &room)
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

	err := cc.roomsService.DeleteUserFromRoom(ctx, roomId, userId)
	util.HandleErrorGin(ctx, err)

	ctx.Status(http.StatusOK)
}

func getPrivateRoomName(ctx *gin.Context, users []schemas.UserResponse) (string, error) {
	if len(users) != 2 {
		return "", fmt.Errorf("a private room must contain exactly 2 users, got %d", len(users))
	}

	currentUserIDRaw, _ := ctx.Get(auth.ContextKeyUserID)
	currentUserID := currentUserIDRaw.(string)
	if users[0].UserID != currentUserID {
		return users[0].Name, nil
	}

	if users[1].UserID != currentUserID {
		return users[1].Name, nil
	}

	return "", fmt.Errorf("current user ID %s does not match any of the provided users", currentUserID)
}
