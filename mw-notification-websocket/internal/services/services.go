package services

import (
	"mw-chat-websocket/internal/schemas"

	"github.com/gin-gonic/gin"
)

type ISocketService interface {
	ConnectSocket(ctx *gin.Context, userID string) error
	SendNotificationReceivedEvent(ctx *gin.Context, payload *schemas.SendNotificationPayload) error
}

type Service struct {
	ISocketService
}

func NewService() *Service {
	return &Service{
		ISocketService: NewSocketService(),
	}
}
