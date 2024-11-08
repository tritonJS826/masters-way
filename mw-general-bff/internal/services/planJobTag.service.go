package services

// import (
// 	"context"
// 	db "mwserver/internal/db/sqlc"
// 	"mwserver/internal/schemas"
// )

// type IPlanJobTagRepository interface {
// 	CreatePlansJobTag(ctx context.Context, arg db.CreatePlansJobTagParams) (db.PlansJobTag, error)
// 	DeletePlansJobTagByIds(ctx context.Context, arg db.DeletePlansJobTagByIdsParams) error
// }

// type PlanJobTagService struct {
// 	planJobTagRepository IPlanJobTagRepository
// }

// func NewPlanJobTagService(planJobTagRepository IPlanJobTagRepository) *PlanJobTagService {
// 	return &PlanJobTagService{planJobTagRepository}
// }

// func (pc *PlanJobTagService) CreatePlanJobTag(ctx context.Context, payload *schemas.CreatePlanJobTagPayload) (*db.PlansJobTag, error) {
// }

// func (ps *PlanJobTagService) DeletePlanJobTagById(ctx context.Context, planID, jobTagID string) error {
// }
