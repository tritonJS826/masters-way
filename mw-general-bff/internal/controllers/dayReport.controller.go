package controllers

import (
	"mw-general-bff/internal/schemas"
	"strconv"

	//"mw-general-bff/internal/auth"
	"mw-general-bff/internal/services"
	"mw-general-bff/pkg/utils"
	"net/http"

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
// @Success 200 {object} openapiGeneral.MwserverInternalSchemasListDayReportsResponse
// @Router /dayReports/{wayId} [get]
func (drc *DayReportController) GetDayReports(ctx *gin.Context) {
	wayUUIDRaw := ctx.Param("wayId")
	page := ctx.DefaultQuery("page", "1")
	limit := ctx.DefaultQuery("limit", "7")

	reqPage, _ := strconv.Atoi(page)
	reqLimit, _ := strconv.Atoi(limit)

	args := &services.GetDayReportsByWayIdParams{
		WayUUID: wayUUIDRaw,
		Page:    reqPage,
		Limit:   reqLimit,
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
// @Success 200 {object} openapiGeneral.MwserverInternalSchemasCompositeDayReportPopulatedResponse
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
