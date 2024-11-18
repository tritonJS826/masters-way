package controllers

import (
	"mw-general-bff/internal/facades"
	"mw-general-bff/internal/schemas"
	"mw-general-bff/pkg/utils"
	"net/http"

	"github.com/gin-gonic/gin"
)

type PlanJobTagController struct {
	planJobTagFacade *facades.PlanJobTagFacade
}

func NewPlanJobTagController(planJobTagFacade *facades.PlanJobTagFacade) *PlanJobTagController {
	return &PlanJobTagController{planJobTagFacade}
}

// Create planJobTag  handler
// @Summary Create a new planJobTag
// @Description
// @Tags planJobTag
// @ID create-planJobTag
// @Accept  json
// @Produce  json
// @Param request body schemas.CreatePlanJobTagPayload true "query params"
// @Success 204
// @Router /planJobTags [post]
func (pc *PlanJobTagController) CreatePlanJobTag(ctx *gin.Context) {
	var payload *schemas.CreatePlanJobTagPayload

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "Failed payload", "error": err.Error()})
		return
	}

	err := pc.planJobTagFacade.CreatePlanJobTag(ctx, payload)
	utils.HandleErrorGin(ctx, err)

	ctx.Status(http.StatusNoContent)
}

// Deleting PlanJobTag handlers
// @Summary Delete planJobTag by UUID
// @Description
// @Tags planJobTag
// @ID delete-planJobTag
// @Accept  json
// @Produce  json
// @Param jobTagId path string true "jobTag ID"
// @Param planId path string true "plan ID"
// @Success 204
// @Router /planJobTags/{jobTagId}/{planId} [delete]
func (pc *PlanJobTagController) DeletePlanJobTagById(ctx *gin.Context) {
	planID := ctx.Param("planId")
	jobTagID := ctx.Param("jobTagId")

	err := pc.planJobTagFacade.DeletePlanJobTagById(ctx, planID, jobTagID)
	utils.HandleErrorGin(ctx, err)

	ctx.Status(http.StatusNoContent)
}
