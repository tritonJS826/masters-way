package services

import (
	"fmt"
	openapiChat "mw-chat-bff/apiAutogenerated/chat"
	"mw-chat-bff/internal/schemas"
	util "mw-chat-bff/internal/utils"

	"github.com/gin-gonic/gin"
	"github.com/samber/lo"
)

type RoomsService struct {
	chatAPI *openapiChat.APIClient
}

func NewRoomsService(chatAPI *openapiChat.APIClient) *RoomsService {
	return &RoomsService{chatAPI}
}

func (roomsService *RoomsService) GetChatPreview(ctx *gin.Context) (*schemas.GetRoomPreviewResponse, error) {
	chatPreviewRaw, _, err := roomsService.chatAPI.RoomAPI.GetChatPreview(ctx).Execute()
	if err != nil {
		return &schemas.GetRoomPreviewResponse{}, err
	}

	chatPreview := schemas.GetRoomPreviewResponse{
		UnreadMessagesAmount: chatPreviewRaw.UnreadMessagesAmount,
	}

	return &chatPreview, nil
}

func (roomsService *RoomsService) GetRooms(ctx *gin.Context, roomType string) (*schemas.GetRoomsResponse, error) {
	roomsRaw, _, err := roomsService.chatAPI.RoomAPI.GetRooms(ctx, roomType).Execute()
	if err != nil {
		return &schemas.GetRoomsResponse{}, err
	}

	rooms := lo.Map(roomsRaw.Rooms, func(roomRaw openapiChat.SchemasRoomPreviewResponse, i int) schemas.RoomPreviewResponse {

		usersPopulated := lo.Map(roomRaw.Users, func(rawUser openapiChat.SchemasUserResponse, i int) schemas.UserResponse {
			return schemas.UserResponse{
				UserID: rawUser.UserId,
				Role:   rawUser.Role,
			}
		})
		var name string
		if roomRaw.Name.Get() != nil {
			name = *roomRaw.Name.Get()
		}
		response := schemas.RoomPreviewResponse{
			RoomID:    roomRaw.RoomId,
			Name:      name,
			RoomType:  roomRaw.RoomType,
			IsBlocked: roomRaw.IsBlocked,
			Users:     usersPopulated,
		}

		return response
	})

	roomsPreview := schemas.GetRoomsResponse{
		Size:  roomsRaw.Size,
		Rooms: rooms,
	}
	return &roomsPreview, nil
}

func (roomsService *RoomsService) GetRoomById(ctx *gin.Context, roomUuid string) (*schemas.RoomPopulatedResponse, error) {
	roomRaw, _, err := roomsService.chatAPI.RoomAPI.GetRoomById(ctx, roomUuid).Execute()
	if err != nil {
		return &schemas.RoomPopulatedResponse{}, err
	}

	messages := lo.Map(roomRaw.Messages, func(messageRaw openapiChat.SchemasMessageResponse, i int) schemas.MessageResponse {

		messageReaders := lo.Map(messageRaw.MessageReaders, func(messageReaderRaw openapiChat.SchemasMessageReader, i int) schemas.MessageReader {
			return schemas.MessageReader{
				UserID:   messageReaderRaw.UserId,
				ReadDate: messageReaderRaw.ReadDate,
			}
		})

		message := schemas.MessageResponse{
			OwnerID: messageRaw.OwnerId,
			Message: messageRaw.Message,
			Readers: messageReaders,
		}

		return message
	})

	users := lo.Map(roomRaw.Users, func(userRaw openapiChat.SchemasUserResponse, i int) schemas.UserResponse {
		return schemas.UserResponse{
			UserID: userRaw.UserId,
			Role:   userRaw.Role,
		}
	})

	var name string
	if roomRaw.Name.Get() != nil {
		name = *roomRaw.Name.Get()
	}
	roomPopulated := schemas.RoomPopulatedResponse{
		RoomID:    roomRaw.RoomId,
		Name:      name,
		Messages:  messages,
		IsBlocked: roomRaw.IsBlocked,
		Users:     users,
		RoomType:  roomRaw.RoomType,
	}
	return &roomPopulated, nil

}

func (roomsService *RoomsService) CreateRoom(ctx *gin.Context, createRoomPayload *schemas.CreateRoomPayload) (*schemas.RoomPopulatedResponse, error) {
	var name = openapiChat.NullableString{}
	if createRoomPayload.Name != nil {
		name.Set(createRoomPayload.Name)
	}
	var userId = openapiChat.NullableString{}
	if createRoomPayload.UserID != nil {
		userId.Set(createRoomPayload.UserID)
	}

	roomRaw, response, err := roomsService.chatAPI.RoomAPI.CreateRoom(ctx).Request(openapiChat.SchemasCreateRoomPayload{
		Name:     name,
		RoomType: createRoomPayload.RoomType,
		UserId:   userId,
	}).Execute()
	if err != nil {
		message, extractErr := util.ExtractErrorMessageFromResponse(response)
		if extractErr != nil {
			return nil, fmt.Errorf("failed to extract error message: %w", extractErr)
		}
		return nil, fmt.Errorf(message)
	}

	messages := lo.Map(roomRaw.Messages, func(messageRaw openapiChat.SchemasMessageResponse, i int) schemas.MessageResponse {
		messageReaders := lo.Map(messageRaw.MessageReaders, func(messageReaderRaw openapiChat.SchemasMessageReader, i int) schemas.MessageReader {
			return schemas.MessageReader{
				UserID:   messageReaderRaw.UserId,
				ReadDate: messageReaderRaw.ReadDate,
			}
		})
		message := schemas.MessageResponse{
			OwnerID: messageRaw.OwnerId,
			Message: messageRaw.Message,
			Readers: messageReaders,
		}
		return message
	})

	users := lo.Map(roomRaw.Users, func(userRaw openapiChat.SchemasUserResponse, i int) schemas.UserResponse {
		return schemas.UserResponse{
			UserID: userRaw.UserId,
			Role:   userRaw.Role,
		}
	})

	var roomPopulatedName string
	if roomRaw.Name.Get() != nil {
		roomPopulatedName = *roomRaw.Name.Get()
	}
	roomPopulatedResponse := &schemas.RoomPopulatedResponse{
		RoomID:    roomRaw.RoomId,
		Name:      roomPopulatedName,
		Messages:  messages,
		IsBlocked: roomRaw.IsBlocked,
		Users:     users,
		RoomType:  roomRaw.RoomType,
	}

	return roomPopulatedResponse, nil
}

func (roomsService *RoomsService) UpdateRoom(ctx *gin.Context, roomId string) (*schemas.RoomPopulatedResponse, error) {
	roomRaw, _, err := roomsService.chatAPI.RoomAPI.UpdateRoom(ctx, roomId).Execute()
	if err != nil {
		return &schemas.RoomPopulatedResponse{}, err
	}
	messages := lo.Map(roomRaw.Messages, func(messageRaw openapiChat.SchemasMessageResponse, i int) schemas.MessageResponse {

		readers := lo.Map(messageRaw.MessageReaders, func(messageReaderRaw openapiChat.SchemasMessageReader, i int) schemas.MessageReader {
			return schemas.MessageReader{
				UserID:   messageReaderRaw.UserId,
				ReadDate: messageReaderRaw.ReadDate,
			}
		})

		message := schemas.MessageResponse{
			OwnerID: messageRaw.OwnerId,
			Message: messageRaw.Message,
			Readers: readers,
		}

		return message
	})

	users := lo.Map(roomRaw.Users, func(userRaw openapiChat.SchemasUserResponse, i int) schemas.UserResponse {
		return schemas.UserResponse{
			UserID: userRaw.UserId,
			Role:   userRaw.Role,
		}
	})

	var name string
	if roomRaw.Name.Get() != nil {
		name = *roomRaw.Name.Get()
	}
	roomPopulatedResponse := schemas.RoomPopulatedResponse{
		RoomID:    roomRaw.RoomId,
		Name:      name,
		Messages:  messages,
		IsBlocked: roomRaw.IsBlocked,
		Users:     users,
		RoomType:  roomRaw.RoomType,
	}

	return &roomPopulatedResponse, nil
}

func (roomsService *RoomsService) CreateMessage(ctx *gin.Context, messageText, roomId string) (*schemas.SendMessagePayload, error) {
	messageRaw, _, err := roomsService.chatAPI.RoomAPI.CreateMessageInRoom(ctx, roomId).Request(openapiChat.SchemasCreateMessagePayload{
		Message: messageText,
	}).Execute()
	if err != nil {
		return nil, err
	}

	messageReaders := lo.Map(messageRaw.Message.MessageReaders, func(messageReaderRaw openapiChat.SchemasMessageReader, i int) schemas.MessageReader {
		return schemas.MessageReader{
			UserID:   messageReaderRaw.UserId,
			ReadDate: messageReaderRaw.ReadDate,
		}
	})

	message := schemas.SendMessagePayload{
		Message: schemas.MessageResponse{
			OwnerID: messageRaw.Message.OwnerId,
			Message: messageRaw.Message.Message,
			Readers: messageReaders,
		},
		UserIDs: messageRaw.Users,
	}

	return &message, nil
}

func (roomsService *RoomsService) AddUserToRoom(ctx *gin.Context, roomId string, userId string) (*schemas.RoomPreviewResponse, error) {
	rawRoom, _, err := roomsService.chatAPI.RoomAPI.AddUserToRoom(ctx, roomId, userId).Execute()
	if err != nil {
		return &schemas.RoomPreviewResponse{}, err
	}

	usersPopulated := lo.Map(rawRoom.Users, func(rawUser openapiChat.SchemasUserResponse, i int) schemas.UserResponse {
		return schemas.UserResponse{
			UserID: rawUser.UserId,
			Role:   rawUser.Role,
		}
	})

	response := schemas.RoomPreviewResponse{
		RoomID:    rawRoom.RoomId,
		Name:      *rawRoom.Name.Get(),
		IsBlocked: rawRoom.IsBlocked,
		Users:     usersPopulated,
	}

	return &response, nil
}

func (roomsService *RoomsService) DeleteUserFromRoom(ctx *gin.Context, roomId string, userId string) error {
	_, err := roomsService.chatAPI.RoomAPI.DeleteUserFromRoom(ctx, roomId, userId).Execute()
	if err != nil {
		return err
	}

	return nil
}
