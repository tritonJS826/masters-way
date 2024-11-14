package facades

import (
	"context"
	"mw-general-bff/internal/schemas"
	"mw-general-bff/internal/services"
)

type FromUserMentoringRequestFacade struct {
	generalService *services.GeneralService
}

func newFromUserMentoringRequestFacade(generalService *services.GeneralService) *FromUserMentoringRequestFacade {
	return &FromUserMentoringRequestFacade{generalService}
}

func (gs *FromUserMentoringRequestFacade) CreateFromUserMentoringRequest(ctx context.Context, userID, wayID string) (*schemas.FromUserMentoringRequestResponse, error) {
	return gs.generalService.CreateFromUserMentoringRequest(ctx, userID, wayID)
}

func (gs *FromUserMentoringRequestFacade) DeleteFromUserMentoringRequestById(ctx context.Context, userID, wayID string) error {
	return gs.generalService.DeleteFromUserMentoringRequestById(ctx, userID, wayID)
}
