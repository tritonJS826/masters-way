package facades

import (
	"context"
	"mw-general-bff/internal/services"
)

type UserProjectFacade struct {
	generalService *services.GeneralService
}

func newUserProjectFacade(generalService *services.GeneralService) *UserProjectFacade {
	return &UserProjectFacade{generalService}
}

func (uf *UserProjectFacade) CreateUserProject(ctx context.Context, userID, projectID string) error {
	return uf.generalService.CreateUserProject(ctx, userID, projectID)
}

func (uf *UserProjectFacade) DeleteUserProject(ctx context.Context, projectID, userID string) error {
	return uf.generalService.DeleteUserProject(ctx, projectID, userID)
}
