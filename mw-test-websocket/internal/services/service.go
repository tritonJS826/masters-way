package services

import (
	"mw-test-websocket/internal/config"
	"mw-test-websocket/internal/openapi"
)

type Services struct {
	General *GeneralService
	Socket  *SocketService
}

type Deps struct {
	Config *config.Config
}

func NewServices(deps Deps) *Services {
	generalApiClient := openapi.MakeGeneralAPIClient(deps.Config)

	return &Services{
		General: NewGeneralService(generalApiClient),
		Socket:  NewSocketService(),
	}
}
