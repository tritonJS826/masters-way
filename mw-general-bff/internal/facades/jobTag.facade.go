package facades

import (
	"context"
	"mw-general-bff/internal/schemas"
	"mw-general-bff/internal/services"
)

type JobTagFacade struct {
	generalService *services.GeneralService
}

func newJobTagFacade(generalService *services.GeneralService) *JobTagFacade {
	return &JobTagFacade{generalService}
}

func (jf *JobTagFacade) CreateJobTag(ctx context.Context, payload *schemas.CreateJobTagPayload) (*schemas.JobTagResponse, error) {
	return jf.generalService.CreateJobTag(ctx, payload)
}

func (jf *JobTagFacade) UpdateJobTag(ctx context.Context, params *services.UpdateJobTagParams) (*schemas.JobTagResponse, error) {
	return jf.generalService.UpdateJobTag(ctx, params)
}

func (jf *JobTagFacade) DeleteJobTagById(ctx context.Context, jobTagID string) error {
	return jf.generalService.DeleteJobTagById(ctx, jobTagID)
}
