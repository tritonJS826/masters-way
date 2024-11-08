package services

// import (
// 	"context"
// 	"mwserver/internal/config"
// 	"mwserver/internal/schemas"

// 	"github.com/google/generative-ai-go/genai"
// )

// type GeminiService struct {
// 	geminiClient *genai.Client
// 	config       *config.Config
// }

// func NewGeminiService(geminiClient *genai.Client, config *config.Config) *GeminiService {
// 	return &GeminiService{geminiClient, config}
// }

// func (geminiService *GeminiService) createMetricsPrompt(payload *schemas.GenerateMetricsPayload) (string, error) {
// }

// func (gs *GeminiService) GetMetricsByGoal(ctx context.Context, payload *schemas.GenerateMetricsPayload) ([]string, error) {
// }

// func (gs *GeminiService) AIChat(ctx context.Context, payload *schemas.AIChatPayload) (*schemas.AIChatResponse, error) {
// }

// func (gs *GeminiService) GeneratePlansByMetric(ctx context.Context, payload *schemas.AIGeneratePlansByMetricPayload) (*schemas.AIGeneratePlansByMetricResponse, error) {
// }

// func (gs *GeminiService) CommentIssue(ctx context.Context, payload *schemas.AICommentIssuePayload) (*schemas.AICommentIssueResponse, error) {
// }

// func (gs *GeminiService) DecomposeIssue(ctx context.Context, payload *schemas.AIDecomposeIssuePayload) (*schemas.AIDecomposeIssueResponse, error) {
// }

// func (gs *GeminiService) EstimateIssue(ctx context.Context, payload *schemas.AIEstimateIssuePayload) (*schemas.AIEstimateIssueResponse, error) {
// }
