package facades

import (
	"context"
	"mw-general-bff/internal/schemas"
	"mw-general-bff/internal/services"
)

type GeminiFacade struct {
	generalService *services.GeneralService
}

func newGeminiFacade(generalService *services.GeneralService) *GeminiFacade {
	return &GeminiFacade{generalService}
}

func (gs *GeminiFacade) CreateMetricsPrompt(ctx context.Context, payload *schemas.GenerateMetricsPayload) (*schemas.GenerateMetricsResponse, error) {
	return gs.generalService.CreateMetricsPrompt(ctx, payload)
}

func (gs *GeminiFacade) AIChat(ctx context.Context, payload *schemas.AIChatPayload) (*schemas.AIChatResponse, error) {
	return gs.generalService.AIChat(ctx, payload)
}

func (gs *GeminiFacade) GeneratePlansByMetric(ctx context.Context, payload *schemas.AIGeneratePlansByMetricPayload) (*schemas.AIGeneratePlansByMetricResponse, error) {
	return gs.generalService.GeneratePlansByMetric(ctx, payload)
}

func (gs *GeminiFacade) CommentIssue(ctx context.Context, payload *schemas.AICommentIssuePayload) (*schemas.AICommentIssueResponse, error) {
	return gs.generalService.CommentIssue(ctx, payload)
}

func (gs *GeminiFacade) DecomposeIssue(ctx context.Context, payload *schemas.AIDecomposeIssuePayload) (*schemas.AIDecomposeIssueResponse, error) {
	return gs.generalService.DecomposeIssue(ctx, payload)
}

func (gs *GeminiFacade) EstimateIssue(ctx context.Context, payload *schemas.AIEstimateIssuePayload) (*schemas.AIEstimateIssueResponse, error) {
	return gs.generalService.EstimateIssue(ctx, payload)
}
