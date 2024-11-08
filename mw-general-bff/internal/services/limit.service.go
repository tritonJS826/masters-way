package services

// import (
// 	"context"
// 	db "mwserver/internal/db/sqlc"

// 	"github.com/google/uuid"
// )

// type LimitService struct {
// 	limitRepository ILimitRepository
// }

// func NewLimitService(db *db.Queries) *LimitService {
// 	return &LimitService{db}
// }

// type LimitReachedParams struct {
// 	LimitName LimitNameType
// 	UserID    string
// 	WayID     *string
// }

// func (ls *LimitService) CheckIsLimitReachedByPricingPlan(ctx context.Context, params *LimitReachedParams) error {
// }

// func (ls *LimitService) GetMaxCompositeWayDepthByUserID(ctx context.Context, userID uuid.UUID) (int, error) {
// }
