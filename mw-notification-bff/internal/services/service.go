package services

import (
	"mw-notification-bff/internal/config"
	"mw-notification-bff/internal/openapi"
)

type Service struct {
	GeneralService *GeneralService
	FileService    *FileService
}

func NewService(config *config.Config) *Service {
	var notificationApi = openapi.MakeNotificationAPIClient(config)
	var notificationBFFApi = openapi.MakeNotificationBFFAPIClient(config)

	return &Service{
		GeneralService: NewGeneralService(notificationBFFApi),
		FileService:    NewFileService(notificationApi),
	}
}

type PopulatedUser struct {
	UserID   string
	Name     string
	ImageURL string
}
