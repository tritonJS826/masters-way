package services

// import (
// 	"context"
// 	"mwserver/internal/schemas"

// 	"github.com/gin-gonic/gin"
// 	"github.com/google/uuid"
// 	"github.com/jackc/pgx/v5/pgtype"
// )

// type WayService struct {
// 	wayRepository IWayRepository
// }

// func NewWayService(wayRepository IWayRepository) *WayService {
// 	return &WayService{wayRepository}
// }

// type GetPopulatedWayByIdParams struct {
// 	WayUuid              uuid.UUID
// 	CurrentChildrenDepth int
// }

// func (ws *WayService) GetPopulatedWayById(ctx context.Context, params GetPopulatedWayByIdParams) (*schemas.WayPopulatedResponse, error) {
// }

// func (ws *WayService) UpdateWayIsCompletedStatus(ctx context.Context, wayID string) error {
// }

// func (ws *WayService) GetPlainWayById(ctx context.Context, wayUUID uuid.UUID) (*schemas.WayPlainResponse, error) {
// }

// func (ws *WayService) CreateWay(ctx context.Context, payload *schemas.CreateWayPayload) (*schemas.WayPlainResponse, error) {
// }

// type UpdateWayParams struct {
// 	WayID           string
// 	Name            string
// 	GoalDescription string
// 	EstimationTime  int32
// 	IsPrivate       *bool
// 	IsCompleted     bool
// }

// func (ws *WayService) UpdateWay(ctx context.Context, params *UpdateWayParams) (*schemas.WayPlainResponse, error) {
// }

// type GetAllWaysParams struct {
// 	Status                 string
// 	WayName                string
// 	Offset                 int
// 	ReqMinDayReportsAmount int
// 	ReqLimit               int
// }

// func (ws *WayService) GetAllWays(ctx context.Context, params *GetAllWaysParams) (*schemas.GetAllWaysResponse, error) {
// }

// func (ws *WayService) DeleteWayById(ctx *gin.Context, wayID string) error {
// 	return ws.wayRepository.DeleteWay(ctx, pgtype.UUID{Bytes: uuid.MustParse(wayID), Valid: true})
// }

// func (ws *WayService) GetChildrenWayIDs(ctx context.Context, wayID uuid.UUID, maxDepth int) ([]uuid.UUID, error) {
// }

// func (ws *WayService) GetNestedWayIDs(ctx context.Context, parentWayUUID pgtype.UUID, currentDepth int, maxDepth int) ([]pgtype.UUID, error) {
// }
