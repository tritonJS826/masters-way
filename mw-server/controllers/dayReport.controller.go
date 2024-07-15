package controllers

import (
	"context"
	"net/http"
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

// Retrieve all records handlers
// @Summary Get all dayReports by Way UUID
// @Description
// @Tags dayReport
// @ID get-dayReports-by-Way-uuid
// @Accept  json
// @Produce  json
// @Param wayId path string true "way ID"
// @Success 200 {array} schemas.DayReportPopulatedResponse
// @Router /dayReports/{wayId} [get]
func (cc *DayReportController) GetAllDayReports(ctx *gin.Context) {
	wayId := ctx.Param("wayId")

	dayReports, err := cc.db.GetListDayReportsByWayUuid(ctx, pgtype.UUID{Bytes: uuid.MustParse(wayId), Valid: true})
	util.HandleErrorGin(ctx, err)

	if len(dayReports) == 0 {
		dayReports = []db.DayReport{}
	}

	ctx.JSON(http.StatusOK, dayReports)
}
