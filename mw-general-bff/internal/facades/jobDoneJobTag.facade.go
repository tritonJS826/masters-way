package facades

import (
	"context"
	"mw-general-bff/internal/schemas"
	"mw-general-bff/internal/services"
)

type JobDoneJobTagFacade struct {
	generalService *services.GeneralService
}

func newJobDoneJobTagFacade(generalService *services.GeneralService) *JobDoneJobTagFacade {
	return &JobDoneJobTagFacade{generalService}
}

func (jf *JobDoneJobTagFacade) CreateJobDoneJobTag(ctx context.Context, payload *schemas.CreateJobDoneJobTagPayload) error {
	return jf.generalService.CreateJobDoneJobTag(ctx, payload)
}

func (jf *JobDoneJobTagFacade) DeleteJobDoneJobTagById(ctx context.Context, jobDoneID, jobTagID string) error {
	return jf.generalService.DeleteJobDoneJobTagById(ctx, jobDoneID, jobTagID)
}
