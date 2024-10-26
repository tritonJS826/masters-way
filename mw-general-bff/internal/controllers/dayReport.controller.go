package controllers

import (
	"net/http"

	"mwserver/internal/auth"
	"mwserver/internal/schemas"
	"mwserver/internal/services"
	"mwserver/pkg/util"

	"github.com/gin-gonic/gin"
)

type DayReportController struct {
	dayReportService *services.DayReportService
	limitService     *services.LimitService
	wayService       *services.WayService
}

func NewDayReportController(
	dayReportService *services.DayReportService,
	limitService *services.LimitService,
	wayService *services.WayService,
) *DayReportController {
	return &DayReportController{dayReportService, limitService, wayService}
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
func (drc *DayReportController) GetDayReports(ctx *gin.Context) {
	// wayIDRaw := ctx.Param("wayId")
	// page := ctx.DefaultQuery("page", "1")
	// limit := ctx.DefaultQuery("limit", "7")

	// wayID := uuid.MustParse(wayIDRaw)
	// reqPage, _ := strconv.Atoi(page)
	// reqLimit, _ := strconv.Atoi(limit)
	// offset := (reqPage - 1) * reqLimit

	// var maxDepth int = 2
	// userIDRaw, exists := ctx.Get(auth.ContextKeyUserID)
	// if exists {
	// 	userID := uuid.MustParse(userIDRaw.(string))
	// 	var err error
	// 	maxDepth, err = drc.limitService.GetMaxCompositeWayDepthByUserID(ctx, userID)
	// 	util.HandleErrorGin(ctx, err)
	// }

	// childrenWays, err := drc.wayService.GetChildrenWayIDs(ctx, wayID, maxDepth)
	// util.HandleErrorGin(ctx, err)

	// args := &services.GetDayReportsByWayIdParams{
	// 	ParentWayID:    wayID,
	// 	ChildrenWayIDs: childrenWays,
	// 	ReqLimit:       reqLimit,
	// 	Offset:         offset,
	// }

	// // TODO: remove info that already exist in the way (user names etc.) - should be rendered on the frontend
	// response, err := drc.dayReportService.GetDayReportsByWayID(ctx, args)
	// util.HandleErrorGin(ctx, err)

	// ctx.JSON(http.StatusOK, response)
}

// Create day report  handler
// @Summary Create a new dayReport
// @Description
// @Tags dayReport
// @ID create-dayReport
// @Accept  json
// @Produce  json
// @Param request body schemas.CreateDayReportPayload true "query params"
// @Success 200 {object} schemas.CompositeDayReportPopulatedResponse
// @Router /dayReports [post]
func (drc *DayReportController) CreateDayReport(ctx *gin.Context) {
	var payload *schemas.CreateDa

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "Failed payload", "error": err.Error()})
		return
	}

	userIDRaw, _ := ctx.Get(auth.ContextKeyUserID)
	userID := userIDRaw.(string)

	err := drc.limitService.CheckIsLimitReachedByPricingPlan(ctx, &services.LimitReachedParams{
		LimitName: services.MaxDayReports,
		UserID:    userID,
		WayID:     &payload.WayID,
	})
	util.HandleErrorGin(ctx, err)

	response, err := drc.dayReportService.CreateDayReport(ctx, payload.WayID)
	util.HandleErrorGin(ctx, err)

	ctx.JSON(http.StatusOK, response)
}
