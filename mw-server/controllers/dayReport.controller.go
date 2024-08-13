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
	db  *db.Queries
	ctx context.Context
	ls  *services.LimitService
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
func (cc *DayReportController) GetDayReports(ctx *gin.Context) {
	wayUuidRaw := ctx.Param("wayId")
	page := ctx.DefaultQuery("page", "1")
	limit := ctx.DefaultQuery("limit", "7")

	wayUuid := uuid.MustParse(wayUuidRaw)
	reqPage, _ := strconv.Atoi(page)
	reqLimit, _ := strconv.Atoi(limit)
	offset := (reqPage - 1) * reqLimit

	args := &services.GetDayReportsByWayIdParams{
		WayUuid:  wayUuid,
		ReqLimit: reqLimit,
		Offset:   offset,
	}

	// TODO: remove info that already exist in the way (user names etc.) - should be rendered on the frontend
	response, err := services.GetDayReportsByWayId(cc.db, ctx, args)
	util.HandleErrorGin(ctx, err)

	ctx.JSON(http.StatusOK, response)
}

func NewDayReportController(db *db.Queries, ctx context.Context, ls *services.LimitService) *DayReportController {
	return &DayReportController{db, ctx, ls}
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

	err := cc.ls.CheckIsLimitReachedByPricingPlan(&services.LimitReachedParams{
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
		IsDayOff:  payload.IsDayOff,
	}

	dbDayReport, err := cc.db.CreateDayReport(ctx, args)
	util.HandleErrorGin(ctx, err)

	updateWayArgs := &db.UpdateWayParams{
		Uuid:      pgtype.UUID{Bytes: payload.WayUuid, Valid: true},
		UpdatedAt: pgtype.Timestamp{Time: now, Valid: true},
	}

	_, err = cc.db.UpdateWay(ctx, *updateWayArgs)
	util.HandleErrorGin(ctx, err)

	response := schemas.DayReportPopulatedResponse{
		Uuid:      util.ConvertPgUUIDToUUID(dbDayReport.Uuid).String(),
		CreatedAt: dbDayReport.CreatedAt.Time.Format(util.DEFAULT_STRING_LAYOUT),
		UpdatedAt: dbDayReport.UpdatedAt.Time.Format(util.DEFAULT_STRING_LAYOUT),
		IsDayOff:  dbDayReport.IsDayOff,
		JobsDone:  make([]schemas.JobDonePopulatedResponse, 0),
		Plans:     make([]schemas.PlanPopulatedResponse, 0),
		Problems:  make([]schemas.ProblemPopulatedResponse, 0),
		Comments:  make([]schemas.CommentPopulatedResponse, 0),
	}

	ctx.JSON(http.StatusOK, response)
}

// Update day report handler
// @Summary Update dayReport by UUID
// @Description
// @Tags dayReport
// @ID update-dayReport
// @Accept  json
// @Produce  json
// @Param request body schemas.UpdateDayReportPayload true "query params"
// @Param dayReportId path string true "dayReport ID"
// @Success 200 {object} schemas.DayReportPopulatedResponse
// @Router /dayReports/{dayReportId} [patch]
func (cc *DayReportController) UpdateDayReport(ctx *gin.Context) {
	var payload *schemas.UpdateDayReportPayload
	dayReportId := ctx.Param("dayReportId")

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "Failed payload", "error": err.Error()})
		return
	}

	now := time.Now()
	args := &db.UpdateDayReportParams{
		Uuid:      pgtype.UUID{Bytes: uuid.MustParse(dayReportId), Valid: true},
		UpdatedAt: pgtype.Timestamp{Time: now, Valid: true},
		IsDayOff:  pgtype.Bool{Bool: payload.IsDayOff, Valid: true},
	}

	dayReport, err := cc.db.UpdateDayReport(ctx, *args)
	util.HandleErrorGin(ctx, err)

	ctx.JSON(http.StatusOK, dayReport)
}
