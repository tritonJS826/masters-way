package controllers

import (
	"net/http"
	"strconv"

	"errors"
	"mwserver/internal/auth"
	"mwserver/internal/customErrors"
	"mwserver/internal/schemas"
	"mwserver/internal/services"
	"mwserver/pkg/util"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/jackc/pgx/v5"
)

type WayController struct {
	wayService           *services.WayService
	wayStatisticsService *services.WayStatisticsService
	dayReportService     *services.DayReportService
	limitService         *services.LimitService
}

func NewWayController(
	wayService *services.WayService,
	wayStatisticsService *services.WayStatisticsService,
	dayReportService *services.DayReportService,
	limitService *services.LimitService,
) *WayController {
	return &WayController{wayService, wayStatisticsService, dayReportService, limitService}
}

// Create way  handler
// @Summary Create a new way
// @Description
// @Tags way
// @ID create-way
// @Accept  json
// @Produce  json
// @Param request body schemas.CreateWayPayload true "query params"
// @Success 200 {object} schemas.WayPlainResponse
// @Router /ways [post]
func (wc *WayController) CreateWay(ctx *gin.Context) {
	var payload *schemas.CreateWayPayload

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	err := wc.limitService.CheckIsLimitReachedByPricingPlan(ctx, &services.LimitReachedParams{
		LimitName: services.MaxOwnWays,
		UserID:    payload.OwnerUuid,
	})
	util.HandleErrorGin(ctx, err)

	way, err := wc.wayService.CreateWay(ctx, payload)
	util.HandleErrorGin(ctx, err)

	ctx.JSON(http.StatusOK, way)
}

// Update way handler
// @Summary Update way by UUID
// @Description
// @Tags way
// @ID update-way
// @Accept  json
// @Produce  json
// @Param request body schemas.UpdateWayPayload true "query params"
// @Param wayId path string true "way ID"
// @Success 200 {object} schemas.WayPlainResponse
// @Router /ways/{wayId} [patch]
func (wc *WayController) UpdateWay(ctx *gin.Context) {
	var payload *schemas.UpdateWayPayload
	wayId := ctx.Param("wayId")

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	userIDRaw, _ := ctx.Get(auth.ContextKeyUserID)
	userID := uuid.MustParse(userIDRaw.(string))

	if payload.IsPrivate != nil && *payload.IsPrivate {
		err := wc.limitService.CheckIsLimitReachedByPricingPlan(ctx, &services.LimitReachedParams{
			LimitName: services.MaxPrivateWays,
			UserID:    userID,
		})
		util.HandleErrorGin(ctx, err)
	}

	way, err := wc.wayService.UpdateWay(ctx, &services.UpdateWayParams{
		WayID:           wayId,
		Name:            payload.Name,
		GoalDescription: payload.GoalDescription,
		EstimationTime:  payload.EstimationTime,
		IsPrivate:       payload.IsPrivate,
		IsCompleted:     payload.IsCompleted,
	})
	util.HandleErrorGin(ctx, err)

	ctx.JSON(http.StatusOK, way)
}

// Get a single handler
// @Summary Get way by UUID
// @Description
// @Tags way
// @ID get-way-by-uuid
// @Accept  json
// @Produce  json
// @Param wayId path string true "way ID"
// @Success 200 {object} schemas.WayPopulatedResponse
// @Router /ways/{wayId} [get]
func (wc *WayController) GetWayById(ctx *gin.Context) {
	wayUuidRaw := ctx.Param("wayId")
	wayUuid := uuid.MustParse(wayUuidRaw)

	args := services.GetPopulatedWayByIdParams{
		WayUuid:              wayUuid,
		CurrentChildrenDepth: 1,
	}
	response, err := wc.wayService.GetPopulatedWayById(ctx, args)
	util.HandleErrorGin(ctx, err)

	ctx.JSON(http.StatusOK, response)
}

// Retrieve all records handlers
// @Summary Get all ways
// @Description Get ways with pagination
// @Tags way
// @ID get-all-ways
// @Accept  json
// @Produce  json
// @Param page query integer false "Page number for pagination"
// @Param limit query integer false "Number of items per page"
// @Param minDayReportsAmount query integer false "Min day reports amount"
// @Param wayName query string false "Way name"
// @Param status query string false "Ways type: all | completed | inProgress | abandoned"
// @Success 200 {object} schemas.GetAllWaysResponse
// @Router /ways [get]
func (wc *WayController) GetAllWays(ctx *gin.Context) {
	page := ctx.DefaultQuery("page", "1")
	limit := ctx.DefaultQuery("limit", "10")
	minDayReportsAmount := ctx.DefaultQuery("minDayReportsAmount", "0")
	wayName := ctx.DefaultQuery("wayName", "")
	// status = "inProgress" | "completed" | "all" | "abandoned"
	status := ctx.DefaultQuery("status", "all")

	reqPage, _ := strconv.Atoi(page)
	reqLimit, _ := strconv.Atoi(limit)
	reqMinDayReportsAmount, _ := strconv.Atoi(minDayReportsAmount)
	offset := (reqPage - 1) * reqLimit

	allWays, err := wc.wayService.GetAllWays(ctx, &services.GetAllWaysParams{
		Status:                 status,
		WayName:                wayName,
		Offset:                 offset,
		ReqMinDayReportsAmount: reqMinDayReportsAmount,
		ReqLimit:               reqLimit,
	})
	util.HandleErrorGin(ctx, err)

	ctx.JSON(http.StatusOK, allWays)
}

// Deleting way handlers
// @Summary Delete way by UUID
// @Description
// @Tags way
// @ID delete-way
// @Accept  json
// @Produce  json
// @Param wayId path string true "way ID"
// @Success 200
// @Router /ways/{wayId} [delete]
func (wc *WayController) DeleteWayById(ctx *gin.Context) {
	wayID := ctx.Param("wayId")

	err := wc.wayService.DeleteWayById(ctx, wayID)
	util.HandleErrorGin(ctx, err)

	ctx.JSON(http.StatusOK, gin.H{"status": "successfuly deleted"})
}

// Get way statistics
// @Summary Get way statistics by UUID
// @Description
// @Tags way
// @ID get-way-statistics-by-uuid
// @Accept  json
// @Produce  json
// @Param wayId path string true "way ID"
// @Success 200 {object} schemas.WayStatisticsTriplePeriod
// @Router /ways/{wayId}/statistics [get]
func (wc *WayController) GetWayStatisticsById(ctx *gin.Context) {
	wayIDRaw := ctx.Param("wayId")
	wayID := uuid.MustParse(wayIDRaw)

	childrenWays, err := wc.wayService.GetChildrenWayIDs(ctx, wayID, 2)
	util.HandleErrorGin(ctx, err)

	ways := make([]uuid.UUID, 0, len(childrenWays)+1)
	ways = append(ways, wayID)
	ways = append(ways, childrenWays...)

	dates, err := wc.dayReportService.GetLastDayReportDate(ctx, ways)
	if err != nil {
		var lastDayReportDateError *customErrors.LastDayReportDateError
		if err == pgx.ErrNoRows || errors.As(err, &lastDayReportDateError) {
			response := &schemas.WayStatisticsTriplePeriod{
				TotalTime: schemas.WayStatistics{
					LabelStatistics:     schemas.LabelStatistics{Labels: make([]schemas.LabelInfo, 0)},
					TimeSpentByDayChart: make([]schemas.TimeSpentByDayPoint, 0),
					OverallInformation:  schemas.OverallInformation{},
				},
				LastMonth: schemas.WayStatistics{
					LabelStatistics:     schemas.LabelStatistics{Labels: make([]schemas.LabelInfo, 0)},
					TimeSpentByDayChart: make([]schemas.TimeSpentByDayPoint, 0),
					OverallInformation:  schemas.OverallInformation{},
				},
				LastWeek: schemas.WayStatistics{
					LabelStatistics:     schemas.LabelStatistics{Labels: make([]schemas.LabelInfo, 0)},
					TimeSpentByDayChart: make([]schemas.TimeSpentByDayPoint, 0),
					OverallInformation:  schemas.OverallInformation{},
				},
			}
			ctx.JSON(http.StatusOK, response)
			return
		}
		util.HandleErrorGin(ctx, err)
	}

	params := &services.GetWayStatisticsTriplePeriodParams{
		WayUUIDs:       ways,
		TotalStartDate: dates.TotalStartDate,
		EndDate:        dates.EndDate,
	}
	response, err := wc.wayStatisticsService.GetWayStatisticsTriplePeriod(ctx, params)
	util.HandleErrorGin(ctx, err)

	ctx.JSON(http.StatusOK, response)
}
