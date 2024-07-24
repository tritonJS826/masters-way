package services

import (
	"mw-chat-bff/internal/schemas"

	"github.com/gin-gonic/gin"
)

type IRoomsService interface {
	GetChatPreview(ctx *gin.Context) (*schemas.GetChatPreviewResponse, error)
	GetRooms(ctx *gin.Context, roomType string) (*schemas.GetRoomsResponse, error)
	GetRoomById(ctx *gin.Context) (*schemas.RoomPopulatedResponse, error)
	CreateRoom(ctx *gin.Context) (*schemas.RoomPopulatedResponse, error)
	UpdateRoom(ctx *gin.Context) error
	CreateMessage(ctx *gin.Context) (*schemas.MessageResponse, error)
	AddUserToRoom(ctx *gin.Context) error
}

type Service struct {
	IRoomsService
}

func NewService(ctx *gin.Context) *Service {
	return &Service{
		IRoomsService: NewRoomsService(),
	}
}
