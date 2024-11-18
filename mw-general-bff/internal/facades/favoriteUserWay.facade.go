package facades

import (
	"context"
	"mw-general-bff/internal/services"

	"github.com/google/uuid"
)

type FavoriteUserWayFacade struct {
	generalService *services.GeneralService
}

func newFavoriteUserWayFacade(generalService *services.GeneralService) *FavoriteUserWayFacade {
	return &FavoriteUserWayFacade{generalService}
}

func (gs *FavoriteUserWayFacade) CreateFavoriteUserWay(ctx context.Context, userUUID, wayUUID uuid.UUID) error {
	return gs.generalService.CreateFavoriteUserWay(ctx, userUUID, wayUUID)
}

func (gs *FavoriteUserWayFacade) DeleteFavoriteUserWayById(ctx context.Context, userID, wayID string) error {
	return gs.generalService.DeleteFavoriteUserWayById(ctx, userID, wayID)
}
