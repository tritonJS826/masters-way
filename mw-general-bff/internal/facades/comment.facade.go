package facades

import (
	"context"
	"mw-general-bff/internal/schemas"
	"mw-general-bff/internal/services"
)

type CommentFacade struct {
	generalService *services.GeneralService
}

func newCommentFacade(generalService *services.GeneralService) *CommentFacade {
	return &CommentFacade{generalService}
}

func (gs *CommentFacade) CreateComment(ctx context.Context, payload *schemas.CreateCommentPayload) (*schemas.CommentPopulatedResponse, error) {
	return gs.generalService.CreateComment(ctx, payload)
}

func (gs *CommentFacade) UpdateComment(ctx context.Context, params *services.UpdateCommentParams) (*schemas.CommentPopulatedResponse, error) {
	return gs.generalService.UpdateComment(ctx, params)
}

func (gs *CommentFacade) DeleteCommentById(ctx context.Context, commentID string) error {
	return gs.generalService.DeleteCommentById(ctx, commentID)
}
