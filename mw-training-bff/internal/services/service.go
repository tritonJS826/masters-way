package services

import (
	"mw-training-bff/internal/config"
	"mw-training-bff/internal/openapi"
)

type Service struct {
	GeneralService *GeneralService
	ChatService    *ChatService
	FileService    *FileService
}

func NewService(config *config.Config) *Service {
	var chatApi = openapi.MakeTrainingAPIClient(config)
	var generalApi = openapi.MakeGeneralAPIClient(config)
	var storageApi = openapi.MakeStorageAPIClient(config)

	return &Service{
		GeneralService: NewGeneralService(generalApi),
		ChatService:    NewChatService(chatApi),
		FileService:    NewFileService(storageApi),
	}
}

type PopulatedUser struct {
	UserID   string
	Name     string
	ImageURL string
}
