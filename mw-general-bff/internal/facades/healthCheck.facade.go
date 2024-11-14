package facades

import (
	"context"
	"mw-general-bff/internal/services"
)

type HealthCheckFacade struct {
	generalService *services.GeneralService
}

func newHealthCheckFacade(generalService *services.GeneralService) *HealthCheckFacade {
	return &HealthCheckFacade{generalService}
}

func (hf *HealthCheckFacade) GeneralHealthCheck(ctx context.Context) error {
	return hf.generalService.GeneralHealthCheck(ctx)
}
