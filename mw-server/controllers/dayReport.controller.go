package controllers

import (
	"context"
	"net/http"
	"strconv"
	"time"

	"mwserver/auth"
	db "mwserver/db/sqlc"
	"mwserver/schemas"
	"mwserver/services"
	"mwserver/util"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/jackc/pgx/v5/pgtype"
)

type DayReportController struct {
	db           *db.Queries
	ctx          context.Context
	limitService *services.LimitService
}

func NewDayReportController(db *db.Queries, ctx context.Context, ls *services.LimitService) *DayReportController {
	return &DayReportController{db, ctx, ls}
}

// Get a list of day reports for specific way
// @Summary Get list of day reports by way UUID
// @Description
// @Tags dayReport
// @ID get-day-reports
// @Accept  json
// @Produce  json
// @Param wayId path string true "way ID"
// @Param page query integer false "Page number for pagination"
// @Param limit query integer false "Number of items per page"
// @Success 200 {object} schemas.ListDayReportsResponse
// @Router /dayReports/{wayId} [get]
func (dayReportController *DayReportController) GetDayReports(ctx *gin.Context) {
	wayIDRaw := ctx.Param("wayId")
	page := ctx.DefaultQuery("page", "1")
	limit := ctx.DefaultQuery("limit", "7")

	wayID := uuid.MustParse(wayIDRaw)
	reqPage, _ := strconv.Atoi(page)
	reqLimit, _ := strconv.Atoi(limit)
	offset := (reqPage - 1) * reqLimit

	// userIDRaw, _ := ctx.Get(auth.ContextKeyUserID)
	// fmt.Println("userIDRaw: ", userIDRaw)
	// userID := uuid.MustParse(userIDRaw.(string))

	// maxDepth, err := dayReportController.limitService.GetMaxCompositeWayDepthByUserID(ctx, userID)
	// util.HandleErrorGin(ctx, err)

	childrenWays, err := services.GetChildrenWayIDs(dayReportController.db, ctx, wayID, 2)
	util.HandleErrorGin(ctx, err)

	args := &services.GetDayReportsByWayIdParams{
		ParentWayID:    wayID,
		ChildrenWayIDs: childrenWays,
		ReqLimit:       reqLimit,
		Offset:         offset,
	}

	// TODO: remove info that already exist in the way (user names etc.) - should be rendered on the frontend
	response, err := services.GetDayReportsByWayID(dayReportController.db, ctx, args)
	util.HandleErrorGin(ctx, err)

	ctx.JSON(http.StatusOK, response)
}

// Create day report  handler
// @Summary Create a new dayReport
// @Description
// @Tags dayReport
// @ID create-dayReport
// @Accept  json
// @Produce  json
// @Param request body schemas.CreateDayReportPayload true "query params"
// @Success 200 {object} schemas.DayReportPopulatedResponse
// @Router /dayReports [post]
func (cc *DayReportController) CreateDayReport(ctx *gin.Context) {
	var payload *schemas.CreateDayReportPayload

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "Failed payload", "error": err.Error()})
		return
	}

	userIDRaw, _ := ctx.Get(auth.ContextKeyUserID)
	userID := uuid.MustParse(userIDRaw.(string))

	err := cc.limitService.CheckIsLimitReachedByPricingPlan(ctx, &services.LimitReachedParams{
		LimitName: services.MaxDayReports,
		UserID:    userID,
		WayID:     &payload.WayUuid,
	})
	util.HandleErrorGin(ctx, err)

	now := time.Now()
	args := db.CreateDayReportParams{
		WayUuid:   pgtype.UUID{Bytes: payload.WayUuid, Valid: true},
		CreatedAt: pgtype.Timestamp{Time: now, Valid: true},
		UpdatedAt: pgtype.Timestamp{Time: now, Valid: true},
	}

	dbDayReport, err := cc.db.CreateDayReport(ctx, args)
	util.HandleErrorGin(ctx, err)

	updateWayArgs := &db.UpdateWayParams{
		Uuid:      pgtype.UUID{Bytes: payload.WayUuid, Valid: true},
		UpdatedAt: pgtype.Timestamp{Time: now, Valid: true},
	}

	way, err := cc.db.UpdateWay(ctx, *updateWayArgs)
	util.HandleErrorGin(ctx, err)

	newUUID, _ := uuid.NewRandom()
	response := schemas.CompositeDayReportPopulatedResponse{
		UUID:      newUUID.String(),
		CreatedAt: dbDayReport.CreatedAt.Time.Truncate(24 * time.Hour).Format(util.DEFAULT_STRING_LAYOUT),
		UpdatedAt: dbDayReport.UpdatedAt.Time.Truncate(24 * time.Hour).Format(util.DEFAULT_STRING_LAYOUT),
		CompositionParticipants: []schemas.DayReportsCompositionParticipants{
			{
				DayReportID: util.ConvertPgUUIDToUUID(dbDayReport.Uuid).String(),
				WayID:       util.ConvertPgUUIDToUUID(way.Uuid).String(),
				WayName:     way.Name,
			},
		},
		JobsDone: make([]schemas.JobDonePopulatedResponse, 0),
		Plans:    make([]schemas.PlanPopulatedResponse, 0),
		Problems: make([]schemas.ProblemPopulatedResponse, 0),
		Comments: make([]schemas.CommentPopulatedResponse, 0),
	}

	ctx.JSON(http.StatusOK, response)
}
