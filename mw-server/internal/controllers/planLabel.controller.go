package controllers

import (
	"net/http"

	"mwserver/internal/schemas"
	"mwserver/internal/services"
	"mwserver/pkg/util"

	"github.com/gin-gonic/gin"
)

type PlanLabelController struct {
	planLabelService *services.PlanLabelService
}

func NewPlanLabelController(planLabelService *services.PlanLabelService) *PlanLabelController {
	return &PlanLabelController{planLabelService}
}

// Create planLabel  handler
// @Summary Create a new planLabel
// @Description
// @Tags planLabel
// @ID create-planLabel
// @Accept  json
// @Produce  json
// @Param request body schemas.CreatePlanLabelPayload true "query params"
// @Success 204
// @Router /planLabels [post]
func (pc *PlanLabelController) CreatePlanLabel(ctx *gin.Context) {
	var payload *schemas.CreatePlanLabelPayload

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "Failed payload", "error": err.Error()})
		return
	}

	_, err := pc.planLabelService.CreatePlanLabel(ctx, payload)
	util.HandleErrorGin(ctx, err)

	ctx.Status(http.StatusNoContent)
}

// Deleting PlanLabel handlers
// @Summary Delete planLabel by UUID
// @Description
// @Tags planLabel
// @ID delete-planLabel
// @Accept  json
// @Produce  json
// @Param labelId path string true "label ID"
// @Param planId path string true "plan ID"
// @Success 204
// @Router /planLabels/{labelId}/{planId} [delete]
func (pc *PlanLabelController) DeletePlanLabelById(ctx *gin.Context) {
	planID := ctx.Param("planId")
	labelID := ctx.Param("labelId")

	err := pc.planLabelService.DeletePlanLabelById(ctx, planID, labelID)
	util.HandleErrorGin(ctx, err)

	ctx.Status(http.StatusNoContent)
}
