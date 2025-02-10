package facades

import (
	"context"
	webapprouter "go-common/webappRouter"
	"mw-general-bff/internal/config"
	"mw-general-bff/internal/schemas"
	"mw-general-bff/internal/services"
)

type CommentFacade struct {
	generalService      *services.GeneralService
	notificationService *services.NotificationService
	mailService         *services.MailService
	config              *config.Config
	router              *webapprouter.WebappRouter
}

func newCommentFacade(
	generalService *services.GeneralService,
	notificationService *services.NotificationService,
	mailService *services.MailService,
	config *config.Config,
) *CommentFacade {
	router := webapprouter.NewWebappRouter(config.WebappBaseURL)
	return &CommentFacade{generalService, notificationService, mailService, config, router}
}

func (cs *CommentFacade) CreateComment(ctx context.Context, payload *schemas.CreateCommentPayload) (*schemas.CommentPopulatedResponse, error) {
	return cs.generalService.CreateComment(ctx, payload)
}

func (cs *CommentFacade) UpdateComment(ctx context.Context, params *services.UpdateCommentParams) (*schemas.CommentPopulatedResponse, error) {
	comment, err := cs.generalService.UpdateComment(ctx, params)

	args := &NotifyWayUpdatedParams{
		generalService:      cs.generalService,
		notificationService: cs.notificationService,
		mailService:         cs.mailService,
		config:              cs.config,
		router:              cs.router,
		wayUuid:             comment.WayUUID,
		modifierUuid:        params.ModifierUserUuid,
	}
	NotifyWayUpdated(ctx, args)

	return comment, err
}

func (cs *CommentFacade) DeleteCommentById(ctx context.Context, commentID string) error {
	return cs.generalService.DeleteCommentById(ctx, commentID)
}
