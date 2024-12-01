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

type RoomController struct {
	generalService       *services.GeneralService
	chatService          *services.ChatService
	chatWebSocketService *services.ChatWebSocketService
}

func NewRoomsController(generalService *services.GeneralService, chatService *services.ChatService, chatWebSocketService *services.ChatWebSocketService) *RoomController {
	return &RoomController{generalService, chatService, chatWebSocketService}
}

// @Summary Get chat preview
// @Description
// @Tags room
// @ID get-chat-preview
// @Accept  json
// @Produce  json
// @Success 200 {object} schemas.GetRoomPreviewResponse
// @Router /rooms/preview [get]
func (cc *RoomController) GetChatPreview(ctx *gin.Context) {
	chatPreview, err := cc.chatService.GetChatPreview(ctx)
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
func (cc *RoomController) GetRooms(ctx *gin.Context) {
	roomType := ctx.Param("roomType")

	rooms, err := cc.chatService.GetRooms(ctx, roomType)
	util.HandleErrorGin(ctx, err)

	userIDsFromAllRooms := lo.FlatMap(rooms.Rooms, func(room schemas.RoomPreviewResponse, _ int) []string {
		return lo.Map(room.Users, func(roomUser schemas.UserResponse, _ int) string {
			return roomUser.UserID
		})
	})

	populatedUserMap, err := cc.generalService.GetPopulatedUsers(ctx, userIDsFromAllRooms)
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

			room.ImageURL, err = getPrivateRoomImageURL(ctx, room.Users)
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
func (cc *RoomController) GetRoomById(ctx *gin.Context) {
	roomId := ctx.Param("roomId")

	room, err := cc.chatService.GetRoomById(ctx, roomId)
	util.HandleErrorGin(ctx, err)

	userIDs := lo.Map(room.Users, func(user schemas.UserResponse, _ int) string {
		return user.UserID
	})

	populatedUserMap, err := cc.generalService.GetPopulatedUsers(ctx, userIDs)
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

		room.ImageURL, err = getPrivateRoomImageURL(ctx, room.Users)
		util.HandleErrorGin(ctx, err)
	}

	ctx.JSON(http.StatusOK, &room)
}

// @Summary Find or create room for user
// @Description
// @Tags room
// @ID find-or-create-room
// @Accept  json
// @Produce  json
// @Param request body schemas.CreateRoomPayload true "query params"
// @Success 200 {object} schemas.RoomPopulatedResponse
// @Router /rooms [post]
func (cc *RoomController) FindOrCreateRoom(ctx *gin.Context) {
	var payload *schemas.CreateRoomPayload

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	currentUserIDRaw, _ := ctx.Get(auth.ContextKeyUserID)
	currentUserID := currentUserIDRaw.(string)

	userIDs := []string{currentUserID}
	if payload.RoomType == RoomTypePrivate {
		userIDs = append(userIDs, *payload.UserID)
	}

	populatedUserMap, err := cc.generalService.GetPopulatedUsers(ctx, userIDs)
	if err != nil {
		util.HandleErrorGin(ctx, fmt.Errorf("general service error: %w", err))
	}

	room, err := cc.chatService.FindOrCreateRoom(ctx, payload)
	if err != nil {
		util.HandleErrorGin(ctx, fmt.Errorf("chat service error: %w", err))
	}

	room.Users = lo.Map(room.Users, func(user schemas.UserResponse, _ int) schemas.UserResponse {
		user.Name = populatedUserMap[user.UserID].Name
		user.ImageURL = populatedUserMap[user.UserID].ImageURL
		return user
	})

	if room.RoomType == RoomTypePrivate {
		room.Name, err = getPrivateRoomName(ctx, room.Users)
		util.HandleErrorGin(ctx, err)

		room.ImageURL, err = getPrivateRoomImageURL(ctx, room.Users)
		util.HandleErrorGin(ctx, err)
	}

	err = cc.chatWebSocketService.SendRoom(ctx, room)
	util.HandleErrorGin(ctx, err)

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
func (cc *RoomController) UpdateRoom(ctx *gin.Context) {
	roomId := ctx.Param("roomId")

	room, err := cc.chatService.UpdateRoom(ctx, roomId)
	util.HandleErrorGin(ctx, err)

	ctx.JSON(http.StatusOK, &room)
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
func (cc *RoomController) AddUserToRoom(ctx *gin.Context) {
	roomId := ctx.Param("roomId")
	userId := ctx.Param("userId")

	room, err := cc.chatService.AddUserToRoom(ctx, roomId, userId)
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
func (cc *RoomController) DeleteUserFromRoom(ctx *gin.Context) {
	roomId := ctx.Param("roomId")
	userId := ctx.Param("userId")

	err := cc.chatService.DeleteUserFromRoom(ctx, roomId, userId)
	util.HandleErrorGin(ctx, err)

	ctx.Status(http.StatusOK)
}

func getPrivateRoomName(ctx *gin.Context, users []schemas.UserResponse) (string, error) {
	if len(users) != 2 {
		return "", fmt.Errorf("A private room must contain exactly 2 users, got %d", len(users))
	}

	currentUserIDRaw, _ := ctx.Get(auth.ContextKeyUserID)
	currentUserID := currentUserIDRaw.(string)

	if users[0].UserID == currentUserID {
		return users[1].Name, nil
	}

	if users[1].UserID == currentUserID {
		return users[0].Name, nil
	}

	return "", fmt.Errorf("current user ID %s does not match any of the provided users", currentUserID)
}

func getPrivateRoomImageURL(ctx *gin.Context, users []schemas.UserResponse) (string, error) {
	if len(users) != 2 {
		return "", fmt.Errorf("A private room must contain exactly 2 users, got %d", len(users))
	}

	currentUserIDRaw, _ := ctx.Get(auth.ContextKeyUserID)
	currentUserID := currentUserIDRaw.(string)
	if users[0].UserID != currentUserID {
		return users[0].ImageURL, nil
	}

	if users[1].UserID != currentUserID {
		return users[1].ImageURL, nil
	}

	return "", fmt.Errorf("current user ID %s does not match any of the provided users", currentUserID)
}
