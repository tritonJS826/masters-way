package facades

import (
	"context"
	"mw-general-bff/internal/schemas"
	"mw-general-bff/internal/services"
)

type PlanJobTagFacade struct {
	generalService *services.GeneralService
}

func newPlanJobTagFacade(generalService *services.GeneralService) *PlanJobTagFacade {
	return &PlanJobTagFacade{generalService}
}

func (gs *PlanJobTagFacade) CreatePlanJobTag(ctx context.Context, payload *schemas.CreatePlanJobTagPayload) error {
	return gs.generalService.CreatePlanJobTag(ctx, payload)
}

func (gs *PlanJobTagFacade) DeletePlanJobTagById(ctx context.Context, planID, jobTagID string) error {
	return gs.generalService.DeletePlanJobTagById(ctx, planID, jobTagID)
}
