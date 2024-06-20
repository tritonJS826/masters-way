package controllers

import (
	"context"
	"database/sql"
	"fmt"
	"net/http"
	"time"

	"mwserver/auth"
	db "mwserver/db/sqlc"
	"mwserver/schemas"
	"mwserver/services"
	"mwserver/util"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
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

	// Get the raw user ID from the context
	userIDRaw, ok := ctx.Get(auth.ContextKeyUserID)
	if !ok {
		util.HandleErrorGin(ctx, fmt.Errorf("user ID not found in context"))
	}

	// Assert the raw user ID to a string
	userIDString, ok := userIDRaw.(string)
	if !ok {
		util.HandleErrorGin(ctx, fmt.Errorf("user ID is not a string"))
	}

	// Parse the string as a UUID
	userID, err := uuid.Parse(userIDString)
	util.HandleErrorGin(ctx, fmt.Errorf("invalid user ID format: %v", err))

	// Проверка достижения ограничения на максимальное количество менторства путей
	err = cc.ls.IsLimitReachedByPricingPlan(services.MaxMentoringsWays, map[services.LimitParamName]uuid.UUID{
		"userID": userID,
		"wayID":  payload.WayUuid,
	})
	util.HandleErrorGin(ctx, err)

	now := time.Now()
	args := &db.CreateDayReportParams{
		WayUuid:   payload.WayUuid,
		CreatedAt: now,
		UpdatedAt: now,
		IsDayOff:  payload.IsDayOff,
	}

	dbDayReport, err := cc.db.CreateDayReport(ctx, *args)
	util.HandleErrorGin(ctx, err)

	updateWayArgs := &db.UpdateWayParams{
		Uuid:      payload.WayUuid,
		UpdatedAt: sql.NullTime{Time: now, Valid: true},
	}

	_, err = cc.db.UpdateWay(ctx, *updateWayArgs)
	util.HandleErrorGin(ctx, err)

	response := schemas.DayReportPopulatedResponse{
		Uuid:      dbDayReport.Uuid.String(),
		CreatedAt: dbDayReport.CreatedAt.Format(util.DEFAULT_STRING_LAYOUT),
		UpdatedAt: dbDayReport.UpdatedAt.Format(util.DEFAULT_STRING_LAYOUT),
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

		Uuid:      uuid.MustParse(dayReportId),
		UpdatedAt: sql.NullTime{Time: now, Valid: true},
		IsDayOff:  sql.NullBool{Bool: payload.IsDayOff, Valid: true},
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
	wayUuid := uuid.MustParse(wayId)

	dayReports, err := cc.db.GetListDayReportsByWayUuid(ctx, wayUuid)
	util.HandleErrorGin(ctx, err)

	if dayReports == nil {
		dayReports = []db.DayReport{}
	}

	ctx.JSON(http.StatusOK, dayReports)
}
