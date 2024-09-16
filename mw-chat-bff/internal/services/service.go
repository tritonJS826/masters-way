package services

import (
	"mw-chat-bff/internal/config"
	"mw-chat-bff/internal/openapi"
)

type Service struct {
	GeneralService       *GeneralService
	ChatService          *ChatService
	ChatWebSocketService *ChatWebSocketService
	FileService          *FileService
}

func NewService(config *config.Config) *Service {
	var chatApi = openapi.MakeChatAPIClient(config)
	var generalApi = openapi.MakeGeneralAPIClient(config)
	var mwChatWebSocketApi = openapi.MakeMWChatWebSocketAPIClient(config)
	var storageApi = openapi.MakeStorageAPIClient(config)

	return &Service{
		GeneralService:       NewGeneralService(generalApi),
		ChatService:          NewChatService(chatApi),
		ChatWebSocketService: NewChatWebSocketService(mwChatWebSocketApi),
		FileService:          NewFileService(storageApi),
	}
}

type PopulatedUser struct {
	UserID   string
	Name     string
	ImageURL string
}
