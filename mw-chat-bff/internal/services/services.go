package services

import (
	"mw-chat-bff/internal/config"
	"mw-chat-bff/internal/openapi"
	"mw-chat-bff/internal/schemas"

	"github.com/gin-gonic/gin"
)

type IRoomsService interface {
	GetChatPreview(ctx *gin.Context) (*schemas.GetChatPreviewResponse, error)
	GetRooms(ctx *gin.Context, roomType string) (*schemas.GetRoomsResponse, error)
	GetRoomById(ctx *gin.Context, roomId string) (*schemas.RoomPopulatedResponse, error)
	CreateRoom(ctx *gin.Context, createRoomPayload *schemas.CreateRoomPayload) (*schemas.RoomPopulatedResponse, error)
	UpdateRoom(ctx *gin.Context, roomId string) (*schemas.RoomPopulatedResponse, error)
	CreateMessage(ctx *gin.Context, messageText, roomId string) (*schemas.MessageResponse, error)
	AddUserToRoom(ctx *gin.Context, roomId string, userId string) (*schemas.RoomPreviewResponse, error)
	DeleteUserFromRoom(ctx *gin.Context, roomId string, userId string) error
}

type IUsersService interface {
	GetChatUsers(ctx *gin.Context, userIDs []string) (map[string]PopulatedUser, error)
}

type Service struct {
	IRoomsService
	IUsersService
}

func NewService(configuration *config.Config) *Service {
	var chatApi = openapi.NewChatAPIClient(configuration)
	var generalApi = openapi.NewGeneralAPIClient(configuration)

	return &Service{
		IRoomsService: NewRoomsService(chatApi),
		IUsersService: NewUsersService(generalApi),
	}
}

type PopulatedUser struct {
	UserID   string
	Name     string
	ImageURL string
}
