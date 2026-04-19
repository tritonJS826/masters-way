package controllers

import (
	"net/http"

	"mw-server/internal/auth"
	"mw-server/internal/customErrors"
	"mw-server/internal/schemas"
	"mw-server/internal/services"
	"mw-server/pkg/util"

	"github.com/gin-gonic/gin"
)

// Without next lines swagger does not see openapi models
var _ = &customErrors.NoRightToChangeDayReportError{}

type ProblemController struct {
	permissionService *services.PermissionService
	problemService    *services.ProblemService
	dayReportService *services.DayReportService
}

func NewProblemController(permissionService *services.PermissionService, problemService *services.ProblemService, dayReportService *services.DayReportService) *ProblemController {
	return &ProblemController{permissionService, problemService, dayReportService}
}

// Create Problem  handler
// @Summary Create a new problem
// @Description
// @Tags problem
// @ID create-problem
// @Accept  json
// @Produce  json
// @Param request body schemas.CreateProblemPayload true "query params"
// @Success 200 {object} schemas.ProblemPopulatedResponse
// @Failure 403 {object} customErrors.NoRightToChangeDayReportError "User doesn't have rights to create problem."
// @Router /problems [post]
func (pc *ProblemController) CreateProblem(ctx *gin.Context) {
	var payload *schemas.CreateProblemPayload

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "Failed payload", "error": err.Error()})
		return
	}

	userIDRaw, _ := ctx.Get(auth.ContextKeyUserID)
	userID := userIDRaw.(string)

	err := pc.permissionService.CheckIsUserHavingPermissionsForDayReport(ctx, userID, payload.DayReportUuid)
	util.HandleErrorGin(ctx, err)

	problem, err := pc.problemService.CreateProblem(ctx, payload)
	util.HandleErrorGin(ctx, err)

	ctx.JSON(http.StatusOK, problem)
}

// CreateProblemForTelegram handler
// @Summary Create problem for telegram
// @Description Creates a problem, automatically finding or creating a day report for today
// @Tags problem
// @ID create-problem-telegram
// @Accept json
// @Produce json
// @Param request body schemas.CreateProblemForTelegramPayload true "query params"
// @Success 200 {object} schemas.ProblemPopulatedResponse
// @Router /problems/telegram [post]
func (pc *ProblemController) CreateProblemForTelegram(ctx *gin.Context) {
	var payload *schemas.CreateProblemForTelegramPayload

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "Failed payload", "error": err.Error()})
		return
	}

	dayReport, err := pc.dayReportService.GetOrCreateTodayDayReport(ctx, payload.WayUuid)
	util.HandleErrorGin(ctx, err)

	problemPayload := &schemas.CreateProblemPayload{
		Description:   payload.Description,
		IsDone:      payload.IsDone,
		OwnerUuid:   payload.OwnerUuid,
		DayReportUuid: dayReport.Uuid,
	}

	problem, err := pc.problemService.CreateProblem(ctx, problemPayload)
	util.HandleErrorGin(ctx, err)

	problemResponse := schemas.ProblemPopulatedResponse{
		Uuid:          problem.Uuid,
		CreatedAt:     problem.CreatedAt,
		UpdatedAt:     problem.UpdatedAt,
		Description:   problem.Description,
		IsDone:        problem.IsDone,
		OwnerUuid:     problem.OwnerUuid,
		OwnerName:     problem.OwnerName,
		DayReportUuid: problem.DayReportUuid,
		WayUUID:       problem.WayUUID,
		WayName:       problem.WayName,
	}

	ctx.JSON(http.StatusOK, problemResponse)
}

// Update Problem handler
// @Summary Update problem by UUID
// @Description
// @Tags problem
// @ID update-problem
// @Accept  json
// @Produce  json
// @Param request body schemas.UpdateProblemPayload true "query params"
// @Param problemId path string true "problem ID"
// @Success 200 {object} schemas.ProblemPopulatedResponse
// @Failure 403 {object} customErrors.NoRightToChangeDayReportError "User doesn't have rights to update problem."
// @Router /problems/{problemId} [patch]
func (pc *ProblemController) UpdateProblem(ctx *gin.Context) {
	var payload *schemas.UpdateProblemPayload
	problemID := ctx.Param("problemId")

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "Failed payload", "error": err.Error()})
		return
	}

	userIDRaw, _ := ctx.Get(auth.ContextKeyUserID)
	userID := userIDRaw.(string)

	err := pc.permissionService.CheckIsUserHavingPermissionsForProblem(ctx, userID, problemID)
	util.HandleErrorGin(ctx, err)

	problem, err := pc.problemService.UpdateProblem(ctx, &services.UpdateProblemParams{
		ProblemID:   problemID,
		Description: payload.Description,
		IsDone:      payload.IsDone,
	})
	util.HandleErrorGin(ctx, err)

	ctx.JSON(http.StatusOK, problem)
}

// Deleting Problem handlers
// @Summary Delete problem by UUID
// @Description
// @Tags problem
// @ID delete-problem
// @Accept  json
// @Produce  json
// @Param problemId path string true "problem ID"
// @Success 204
// @Failure 403 {object} customErrors.NoRightToChangeDayReportError "User doesn't have rights to delete problem."
// @Router /problems/{problemId} [delete]
func (pc *ProblemController) DeleteProblemById(ctx *gin.Context) {
	problemID := ctx.Param("problemId")

	userIDRaw, _ := ctx.Get(auth.ContextKeyUserID)
	userID := userIDRaw.(string)

	err := pc.permissionService.CheckIsUserHavingPermissionsForProblem(ctx, userID, problemID)
	util.HandleErrorGin(ctx, err)

	err = pc.problemService.DeleteProblemById(ctx, problemID)
	util.HandleErrorGin(ctx, err)

	ctx.Status(http.StatusNoContent)
}
