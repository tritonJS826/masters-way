package facades

import (
	"context"
	"mw-general-bff/internal/schemas"
	"mw-general-bff/internal/services"
)

type FavoriteUserFacade struct {
	generalService *services.GeneralService
}

func newFavoriteUserFacade(generalService *services.GeneralService) *FavoriteUserFacade {
	return &FavoriteUserFacade{generalService}
}

func (gs *FavoriteUserFacade) CreateFavoriteUser(ctx context.Context, payload *schemas.CreateFavoriteUserPayload) error {
	return gs.generalService.CreateFavoriteUser(ctx, payload)
}

func (gs *FavoriteUserFacade) DeleteFavoriteUserById(ctx context.Context, donorUserUuid, acceptorUserUuid string) error {
	return gs.generalService.DeleteFavoriteUserById(ctx, donorUserUuid, acceptorUserUuid)
}
