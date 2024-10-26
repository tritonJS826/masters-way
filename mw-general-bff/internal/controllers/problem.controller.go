package controllers

import (
	"mw-general-bff/internal/schemas"
	"mw-general-bff/internal/services"
	"mw-general-bff/pkg/utils"
	"net/http"

	"github.com/gin-gonic/gin"
)

type ProblemController struct {
	generalService *services.GeneralService
}

func NewProblemController(generalService *services.GeneralService) *ProblemController {
	return &ProblemController{generalService}
}

// Create Problem handler
// @Summary Create a new problem
// @Description
// @Tags problem
// @ID create-problem
// @Accept  json
// @Produce  json
// @Param request body schemas.CreateProblemPayload true "query params"
// @Success 200 {object} schemas.ProblemPopulatedResponse
// @Failure 403 {object} schemas.NoRightToChangeDayReportError "User doesn't have rights to create problem."
// @Router /problems [post]
func (pc *ProblemController) CreateProblem(ctx *gin.Context) {
	var payload *schemas.CreateProblemPayload

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "Failed payload", "error": err.Error()})
		return
	}

	problem, err := pc.generalService.CreateProblem(ctx, payload)
	utils.HandleErrorGin(ctx, err)

	ctx.JSON(http.StatusOK, problem)
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
// @Failure 403 {object} schemas.NoRightToChangeDayReportError "User doesn't have rights to update problem."
// @Router /problems/{problemId} [patch]
func (pc *ProblemController) UpdateProblem(ctx *gin.Context) {
	var payload *schemas.UpdateProblemPayload
	problemID := ctx.Param("problemId")

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "Failed payload", "error": err.Error()})
		return
	}

	problem, err := pc.generalService.UpdateProblem(ctx, &services.UpdateProblemParams{
		ProblemID:   problemID,
		Description: payload.Description,
		IsDone:      payload.IsDone,
	})
	utils.HandleErrorGin(ctx, err)

	ctx.JSON(http.StatusOK, problem)
}

// Delete Problem handler
// @Summary Delete problem by UUID
// @Description
// @Tags problem
// @ID delete-problem
// @Accept  json
// @Produce  json
// @Param problemId path string true "problem ID"
// @Success 204
// @Failure 403 {object} schemas.NoRightToChangeDayReportError "User doesn't have rights to delete problem."
// @Router /problems/{problemId} [delete]
func (pc *ProblemController) DeleteProblemById(ctx *gin.Context) {
	problemID := ctx.Param("problemId")

	err = pc.generalService.DeleteProblemById(ctx, problemID)
	utils.HandleErrorGin(ctx, err)

	ctx.Status(http.StatusNoContent)
}
