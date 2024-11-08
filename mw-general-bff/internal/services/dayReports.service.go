package services

// import (
// 	"context"
// 	db "mwserver/internal/db/sqlc"
// 	"mwserver/internal/schemas"
// 	"time"

// 	"github.com/google/uuid"
// 	"github.com/jackc/pgx/v5/pgtype"
// )

// type IDayReportRepository interface {
// 	GetDayReportsByRankRange(ctx context.Context, arg db.GetDayReportsByRankRangeParams) ([]db.GetDayReportsByRankRangeRow, error)
// 	GetWayRelatedUsers(ctx context.Context, wayUuids []pgtype.UUID) ([]db.GetWayRelatedUsersRow, error)
// 	GetListJobTagsByWayUuids(ctx context.Context, wayUuids []pgtype.UUID) ([]db.JobTag, error)
// 	GetJobDonesByDayReportUuids(ctx context.Context, dayReportUuids []pgtype.UUID) ([]db.GetJobDonesByDayReportUuidsRow, error)
// 	GetPlansByDayReportUuids(ctx context.Context, dayReportUuids []pgtype.UUID) ([]db.GetPlansByDayReportUuidsRow, error)
// 	GetLastDayReportDate(ctx context.Context, wayUuids []pgtype.UUID) (db.GetLastDayReportDateRow, error)
// 	GetProblemsByDayReportUuids(ctx context.Context, dollar_1 []pgtype.UUID) ([]db.Problem, error)
// 	GetListCommentsByDayReportUuids(ctx context.Context, dayReportUuids []pgtype.UUID) ([]db.Comment, error)
// 	CreateDayReport(ctx context.Context, arg db.CreateDayReportParams) (db.DayReport, error)
// 	UpdateWay(ctx context.Context, arg db.UpdateWayParams) (db.UpdateWayRow, error)
// }

// type DayReportService struct {
// 	dayReportRepository IDayReportRepository
// }

// func NewDayReportService(dayReportRepository IDayReportRepository) *DayReportService {
// 	return &DayReportService{dayReportRepository}
// }

// type GetDayReportsByWayIdParams struct {
// 	ParentWayID    uuid.UUID
// 	ChildrenWayIDs []uuid.UUID
// 	ReqLimit       int
// 	Offset         int
// }

// func (drs *DayReportService) GetDayReportsByWayID(ctx context.Context, params *GetDayReportsByWayIdParams) (*schemas.ListDayReportsResponse, error) {
// }

// type GetLastDayReportDateResponse struct {
// 	TotalStartDate time.Time
// 	EndDate        time.Time
// }

// func (ds *DayReportService) GetLastDayReportDate(ctx context.Context, wayUUIDs []uuid.UUID) (*GetLastDayReportDateResponse, error) {
// }

// func (drs *DayReportService) CreateDayReport(ctx context.Context, wayID string) (*schemas.CompositeDayReportPopulatedResponse, error) {
// }
