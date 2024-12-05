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

	userMap, err := cc.generalService.GetUserMapByIds(ctx, userIDsFromAllRooms)
	util.HandleErrorGin(ctx, err)

	rooms.Rooms = lo.Map(rooms.Rooms, func(room schemas.RoomPreviewResponse, _ int) schemas.RoomPreviewResponse {
		room.Users = lo.Map(room.Users, func(user schemas.UserResponse, _ int) schemas.UserResponse {
			shortUser, ok := userMap[user.UserID]
			if !ok {
				util.HandleErrorGin(ctx, fmt.Errorf("User with ID %s not found in the general service", user.UserID))
			}

			user.Name = shortUser.Name
			user.ImageURL = shortUser.ImageURL

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

	userMap, err := cc.generalService.GetUserMapByIds(ctx, userIDs)
	util.HandleErrorGin(ctx, err)

	room.Users = lo.Map(room.Users, func(user schemas.UserResponse, _ int) schemas.UserResponse {
		shortUser, ok := userMap[user.UserID]
		if !ok {
			util.HandleErrorGin(ctx, fmt.Errorf("User with ID %s not found in the general service", user.UserID))
		}

		user.Name = shortUser.Name
		user.ImageURL = shortUser.ImageURL
		return user
	})

	room.Messages = lo.Map(room.Messages, func(message schemas.MessageResponse, _ int) schemas.MessageResponse {
		if shortUser, ok := userMap[message.OwnerID]; ok {
			message.OwnerName = shortUser.Name
			message.OwnerImageURL = shortUser.ImageURL
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

	type populatedUserMapChResponseType struct {
		UserMap map[string]services.PopulatedUser
		Err     *error
	}

	populatedUserMapCh := make(chan *populatedUserMapChResponseType)
	go func() {
		currentUserIDRaw, _ := ctx.Get(auth.ContextKeyUserID)
		currentUserID := currentUserIDRaw.(string)

		userIDs := []string{currentUserID}
		if payload.RoomType == RoomTypePrivate {
			userIDs = append(userIDs, *payload.UserID)
		}

		populatedUserMap, err := cc.generalService.GetPopulatedUsers(ctx, userIDs)
		populatedUserMapCh <- &populatedUserMapChResponseType{
			UserMap: populatedUserMap,
			Err:     &err,
		}
	}()

	type findOrCreateRoomChResponseType struct {
		Room *schemas.FindOrCreateRoomResponse
		Err  *error
	}
	findOrCreateRoomCh := make(chan *findOrCreateRoomChResponseType)
	go func() {
		findOrCreateRoomResponse, err := cc.chatService.FindOrCreateRoom(ctx, payload)

		findOrCreateRoomCh <- &findOrCreateRoomChResponseType{
			Room: findOrCreateRoomResponse,
			Err:  &err,
		}
	}()

	populatedUserMapChResponse := <-populatedUserMapCh
	if populatedUserMapChResponse.Err != nil {
		util.HandleErrorGin(ctx, *populatedUserMapChResponse.Err)
	}

	findOrCreateRoomChResponse := <-findOrCreateRoomCh
	if findOrCreateRoomChResponse.Err != nil {
		util.HandleErrorGin(ctx, *findOrCreateRoomChResponse.Err)
	}

	populatedUserMap := populatedUserMapChResponse.UserMap
	room := findOrCreateRoomChResponse.Room.Room

	roomUsers := lo.Map(room.Users, func(user schemas.UserResponse, _ int) schemas.UserResponse {
		user.Name = populatedUserMap[user.UserID].Name
		user.ImageURL = populatedUserMap[user.UserID].ImageURL
		return user
	})

	roomMessages := lo.Map(findOrCreateRoomChResponse.Room.Room.Messages, func(message schemas.MessageResponse, _ int) schemas.MessageResponse {
		message.OwnerName = populatedUserMap[message.OwnerID].Name
		message.OwnerImageURL = populatedUserMap[message.OwnerID].ImageURL
		return message
	})
	fmt.Print(3)

	var err error
	// TODO: handle room name for group chat
	roomName := findOrCreateRoomChResponse.Room.Room.Name
	imageUrl := findOrCreateRoomChResponse.Room.Room.ImageURL

	if findOrCreateRoomChResponse.Room.Room.RoomType == RoomTypePrivate {
		fmt.Print(roomUsers[0].Name)

		roomName, err = getPrivateRoomName(ctx, roomUsers)
		util.HandleErrorGin(ctx, err)
		fmt.Print(roomName)

		imageUrl, err = getPrivateRoomImageURL(ctx, roomUsers)
		util.HandleErrorGin(ctx, err)
		fmt.Print(roomName, imageUrl)

	}

	room = &schemas.RoomPopulatedResponse{
		RoomID:    findOrCreateRoomChResponse.Room.Room.RoomID,
		Name:      roomName,
		ImageURL:  imageUrl,
		RoomType:  findOrCreateRoomChResponse.Room.Room.RoomType,
		IsBlocked: findOrCreateRoomChResponse.Room.Room.IsBlocked,
		Users:     roomUsers,
		Messages:  roomMessages,
	}

	if findOrCreateRoomChResponse.Room.IsAlreadyCreated {
		ctx.JSON(http.StatusOK, room)
		return
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
