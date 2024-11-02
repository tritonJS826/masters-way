package controllers

import (
	"github.com/google/uuid"
	"mw-general-bff/internal/schemas"
	"mw-general-bff/internal/services"
	"mw-general-bff/pkg/utils"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

type WayController struct {
	generalService *services.GeneralService
}

func NewWayController(generalService *services.GeneralService) *WayController {
	return &WayController{generalService}
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

	args := &schemas.CreateWayPayload{
		Name:            payload.Name,
		GoalDescription: payload.GoalDescription,
		OwnerID:         payload.OwnerID,
		CopiedFromWayID: payload.CopiedFromWayID,
		ProjectID:       payload.ProjectID,
		EstimationTime:  payload.EstimationTime,
		IsCompleted:     payload.IsCompleted,
		IsPrivate:       payload.IsPrivate,
	}

	way, err := wc.generalService.CreateWay(ctx, args)
	utils.HandleErrorGin(ctx, err)

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

	args := &services.UpdateWayParams{
		WayID:           wayId,
		Name:            payload.Name,
		GoalDescription: payload.GoalDescription,
		EstimationTime:  payload.EstimationTime,
		IsPrivate:       *payload.IsPrivate,
		IsCompleted:     payload.IsCompleted,
	}

	way, err := wc.generalService.UpdateWay(ctx, args)
	utils.HandleErrorGin(ctx, err)

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
	//wayUuidRaw := ctx.Param("wayId")
	//wayUuid := uuid.MustParse(wayUuidRaw)
	//
	//args := services.GetPopulatedWayByIdParams{
	//	WayUuid:              wayUuid,
	//	CurrentChildrenDepth: 1,
	//}
	////response, err := wc.generalService.GetNestedWayIDs(ctx, args)
	//utils.HandleErrorGin(ctx, err)
	//
	//ctx.JSON(http.StatusOK, response)
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
	status := ctx.DefaultQuery("status", "all")

	reqPage, _ := strconv.Atoi(page)
	reqLimit, _ := strconv.Atoi(limit)
	reqMinDayReportsAmount, _ := strconv.Atoi(minDayReportsAmount)
	offset := (reqPage - 1) * reqLimit

	allWays, err := wc.generalService.GetAllWays(ctx, &services.GetAllWaysParams{
		Status:                 status,
		WayName:                wayName,
		Offset:                 offset,
		ReqMinDayReportsAmount: reqMinDayReportsAmount,
		ReqLimit:               reqLimit,
	})
	utils.HandleErrorGin(ctx, err)

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
// @Success 204
// @Router /ways/{wayId} [delete]
func (wc *WayController) DeleteWayById(ctx *gin.Context) {
	wayID := ctx.Param("wayId")

	err := wc.generalService.DeleteWayById(ctx, wayID)
	utils.HandleErrorGin(ctx, err)

	ctx.Status(http.StatusNoContent)
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
	//TODO this
	wayIDRaw := ctx.Param("wayId")
	wayID := uuid.MustParse(wayIDRaw)

	childrenWays, err := wc.generalService.GetChildrenWayIDs(ctx, wayID, 2)
	utils.HandleErrorGin(ctx, err)
	_ = childrenWays
	//
	//ways := make([]uuid.UUID, 0, len(childrenWays)+1)
	//ways = append(ways, wayID)
	//ways = append(ways, childrenWays...)
	//
	//dates, err := wc.generalService.GetLastDayReportDate(ctx, ways)
	//if err != nil {
	//	var lastDayReportDateError *customErrors.LastDayReportDateError
	//	if err == pgx.ErrNoRows || errors.As(err, &lastDayReportDateError) {
	//		response := &schemas.WayStatisticsTriplePeriod{
	//			TotalTime: schemas.WayStatistics{
	//				LabelStatistics:     schemas.LabelStatistics{Labels: make([]schemas.LabelInfo, 0)},
	//				TimeSpentByDayChart: make([]schemas.TimeSpentByDayPoint, 0),
	//				OverallInformation:  schemas.OverallInformation{},
	//			},
	//			LastMonth: schemas.WayStatistics{
	//				LabelStatistics:     schemas.LabelStatistics{Labels: make([]schemas.LabelInfo, 0)},
	//				TimeSpentByDayChart: make([]schemas.TimeSpentByDayPoint, 0),
	//				OverallInformation:  schemas.OverallInformation{},
	//			},
	//			LastWeek: schemas.WayStatistics{
	//				LabelStatistics:     schemas.LabelStatistics{Labels: make([]schemas.LabelInfo, 0)},
	//				TimeSpentByDayChart: make([]schemas.TimeSpentByDayPoint, 0),
	//				OverallInformation:  schemas.OverallInformation{},
	//			},
	//		}
	//		ctx.JSON(http.StatusOK, response)
	//		return
	//	}
	//	utils.HandleErrorGin(ctx, err)
	//}
	//
	//params := &services.GetWayStatisticsTriplePeriodParams{
	//	WayUUIDs:       ways,
	//	TotalStartDate: dates.TotalStartDate,
	//	EndDate:        dates.EndDate,
	//}
	//response, err := wc.generalService.GetWayStatisticsTriplePeriod(ctx, params)
	//utils.HandleErrorGin(ctx, err)
	//
	//ctx.JSON(http.StatusOK, response)
}
