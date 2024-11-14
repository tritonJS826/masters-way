package facades

import (
	"context"
	"mw-general-bff/internal/services"
)

type MentorUserWayFacade struct {
	generalService *services.GeneralService
}

func newMentorUserWayFacade(generalService *services.GeneralService) *MentorUserWayFacade {
	return &MentorUserWayFacade{generalService}
}

func (mf *MentorUserWayFacade) AddMentorUserWay(ctx context.Context, userID, wayID string) error {
	return mf.generalService.AddMentorUserWay(ctx, userID, wayID)
}

func (mf *MentorUserWayFacade) DeleteMentorUserWay(ctx context.Context, userID, wayID string) error {
	return mf.generalService.DeleteMentorUserWay(ctx, userID, wayID)
}
