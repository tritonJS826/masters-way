package services

import (
	"context"
	"mw-test-websocket/internal/config"
	"mw-test-websocket/internal/openapi"
)

type ISocketService interface {
	ConnectSocket(ctx context.Context) error
}

type Service struct {
	// ISocketService
	GeneralService
}

func NewService(config *config.Config) *Service {
	var generalApi = openapi.MakeGeneralAPIClient(config)

	return &Service{
		// ISocketService: NewSocketService(),
		GeneralService: *NewGeneralService(generalApi),
	}
}
