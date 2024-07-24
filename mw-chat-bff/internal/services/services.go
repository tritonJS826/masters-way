package services

import (
	"mw-chat-bff/internal/schemas"

	"github.com/gin-gonic/gin"
)

type IRoomsService interface {
	GetChatPreview(ctx *gin.Context) (*schemas.GetChatPreviewResponse, error)
	GetRooms(ctx *gin.Context, roomType string) (*schemas.GetRoomsResponse, error)
	GetRoomById(ctx *gin.Context, roomId string) (*schemas.RoomPopulatedResponse, error)
	CreateRoom(ctx *gin.Context, createRoomPayload *schemas.CreateRoomPayload) (*schemas.RoomPopulatedResponse, error)
	UpdateRoom(ctx *gin.Context, roomId string) (*schemas.RoomPopulatedResponse, error)
	CreateMessage(ctx *gin.Context, roomId string) (*schemas.MessageResponse, error)
	AddUserToRoom(ctx *gin.Context, roomId string, userId string) (*schemas.RoomPreviewResponse, error)
	DeleteUserFromRoom(ctx *gin.Context, roomId string, userId string) error
}

type Service struct {
	IRoomsService
}

func NewService(ctx *gin.Context) *Service {
	return &Service{
		IRoomsService: NewRoomsService(),
	}
}
