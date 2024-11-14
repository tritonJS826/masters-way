package facades

import (
	"context"
	"mw-general-bff/internal/schemas"
	"mw-general-bff/internal/services"
)

type CompositeWayFacade struct {
	generalService *services.GeneralService
}

func newCompositeWayFacade(generalService *services.GeneralService) *CompositeWayFacade {
	return &CompositeWayFacade{generalService}
}

func (gs *CompositeWayFacade) AddWayToCompositeWay(ctx context.Context, params *schemas.AddWayToCompositeWayPayload) (*schemas.CompositeWayRelation, error) {
	return gs.generalService.AddWayToCompositeWay(ctx, params)
}

func (gs *CompositeWayFacade) DeleteCompositeWayRelation(ctx context.Context, parentWayID, childWayID string) error {
	return gs.generalService.DeleteCompositeWayRelation(ctx, parentWayID, childWayID)
}
