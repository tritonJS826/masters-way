package controllers

import (
	"github.com/google/uuid"
	"mw-general-bff/internal/schemas"

	//"mw-general-bff/internal/auth"
	"mw-general-bff/internal/services"
	"mw-general-bff/pkg/utils"
	"net/http"
	"strconv"

	//"mw-general-bff/pkg/utils"
	//"net/http"

	"github.com/gin-gonic/gin"
)

type DayReportController struct {
	generalService *services.GeneralService
}

func NewDayReportController(generalService *services.GeneralService) *DayReportController {
	return &DayReportController{generalService}
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
	wayIDRaw := ctx.Param("wayId")
	page := ctx.DefaultQuery("page", "1")
	limit := ctx.DefaultQuery("limit", "7")

	wayID := uuid.MustParse(wayIDRaw)
	reqPage, _ := strconv.Atoi(page)
	reqLimit, _ := strconv.Atoi(limit)
	offset := (reqPage - 1) * reqLimit

	var maxDepth int = 2
	//userIDRaw, exists := ctx.Get(auth.ContextKeyUserID)
	//if exists {
	//	userID := uuid.MustParse(userIDRaw.(string))
	//	var err error
	//	maxDepth, err = drc.generalService.GetMaxCompositeWayDepthByUserID(ctx, userID)
	//	utils.HandleErrorGin(ctx, err)
	//}

	childrenWays, err := drc.generalService.GetChildrenWayIDs(ctx, wayID, maxDepth)
	utils.HandleErrorGin(ctx, err)

	args := &services.GetDayReportsByWayIdParams{
		ParentWayID:    wayID,
		ChildrenWayIDs: childrenWays,
		ReqLimit:       reqLimit,
		Offset:         offset,
	}

	response, err := drc.generalService.GetDayReportsByWayID(ctx, args)
	utils.HandleErrorGin(ctx, err)

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
// @Success 200 {object} schemas.CompositeDayReportPopulatedResponse
// @Router /dayReports [post]
func (drc *DayReportController) CreateDayReport(ctx *gin.Context) {
	var payload *schemas.CreateDayReportPayload

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "Failed payload", "error": err.Error()})
		return
	}

	response, err := drc.generalService.CreateDayReport(ctx, payload.WayID)
	utils.HandleErrorGin(ctx, err)

	ctx.JSON(http.StatusOK, response)
}
