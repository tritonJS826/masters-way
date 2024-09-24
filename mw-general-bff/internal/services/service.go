package services

import (
	"mw-general-bff/internal/config"
	"mw-general-bff/internal/openapi"
)

type Service struct {
	GeneralService *GeneralService
	FileService    *FileService
}

func NewService(config *config.Config) *Service {
	var generalApi = openapi.MakeGeneralAPIClient(config)
	var storageApi = openapi.MakeStorageAPIClient(config)

	return &Service{
		GeneralService: NewGeneralService(generalApi),
		FileService:    NewFileService(storageApi),
	}
}

type PopulatedUser struct {
	UserID   string
	Name     string
	ImageURL string
}
