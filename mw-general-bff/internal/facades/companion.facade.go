package facades

import (
	"context"

	"mw-general-bff/internal/schemas"
	"mw-general-bff/internal/services"
)

type CompanionFacade struct {
	generalService *services.GeneralService
}

func newCompanionFacade(generalService *services.GeneralService) *CompanionFacade {
	return &CompanionFacade{generalService}
}

func (cf *CompanionFacade) GetCompanionFeedback(ctx context.Context, wayID string) (*schemas.CompanionFeedbackResponse, error) {
	return cf.generalService.GetCompanionFeedback(ctx, wayID)
}
