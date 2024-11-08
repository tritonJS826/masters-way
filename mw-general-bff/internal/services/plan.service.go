package services

// import (
// 	"context"
// 	db "mwserver/internal/db/sqlc"
// 	"mwserver/internal/schemas"

// 	"github.com/jackc/pgx/v5/pgtype"
// )

// type IPlanRepository interface {
// 	CreatePlan(ctx context.Context, arg db.CreatePlanParams) (db.CreatePlanRow, error)
// 	UpdatePlan(ctx context.Context, arg db.UpdatePlanParams) (db.UpdatePlanRow, error)
// 	DeletePlan(ctx context.Context, planUuid pgtype.UUID) error
// }

// type PlanService struct {
// 	planRepository IPlanRepository
// }

// func NewPlanService(planRepository IPlanRepository) *PlanService {
// 	return &PlanService{planRepository}
// }

// type Plan struct {
// 	ID          string
// 	CreatedAt   string
// 	UpdatedAt   string
// 	Description string
// 	Time        int32
// 	OwnerUuid   string
// 	OwnerName   string
// 	IsDone      bool
// 	DayReportID string
// 	WayUUID     string
// 	WayName     string
// 	TagIDs      []string
// }

// func (ps *PlanService) CreatePlan(ctx context.Context, payload *schemas.CreatePlanPayload) (*Plan, error) {
// }

// type UpdatePlanParams struct {
// 	PlanID      string
// 	Description *string
// 	Time        *int32
// 	IsDone      *bool
// }

// func (ps *PlanService) UpdatePlan(ctx context.Context, params *UpdatePlanParams) (*Plan, error) {
// }

// func (ps *PlanService) DeletePlanById(ctx context.Context, planID string) error {
// }
