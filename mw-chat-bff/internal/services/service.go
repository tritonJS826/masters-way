package services

import (
	"mw-chat-bff/internal/config"
	"mw-chat-bff/internal/openapi"
)

type Service struct {
	GeneralService       *GeneralService
	ChatService          *ChatService
	ChatWebSocketService *ChatWebSocketService
}

func NewService(config *config.Config) *Service {
	var chatApi = openapi.MakeChatAPIClient(config)
	var generalApi = openapi.MakeGeneralAPIClient(config)
	var mwChatWebSocketApi = openapi.MakeMWChatWebSocketAPIClient(config)

	return &Service{
		GeneralService:       NewGeneralService(generalApi),
		ChatService:          NewChatService(chatApi),
		ChatWebSocketService: NewChatWebSocketService(mwChatWebSocketApi),
	}
}

type PopulatedUser struct {
	UserID   string
	Name     string
	ImageURL string
}
