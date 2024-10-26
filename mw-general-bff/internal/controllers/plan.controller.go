package controllers

import (
	"net/http"

	"mwserver/internal/auth"
	"mwserver/internal/services"
	"mwserver/pkg/util"

	"github.com/gin-gonic/gin"
)

type PlanController struct {
	permissionService *services.PermissionService
	planService       *services.PlanService
	jobTagService     *services.JobTagService
}

func NewPlanController(
	permissionService *services.PermissionService,
	planService *services.PlanService,
	jobTagService *services.JobTagService,
) *PlanController {
	return &PlanController{permissionService, planService, jobTagService}
}

// Create Plan handler
// @Summary Create a new plan
// @Description
// @Tags plan
// @ID create-plan
// @Accept  json
// @Produce  json
// @Param request body schemas.CreatePlanPayload true "query params"
// @Success 200 {object} schemas.PlanPopulatedResponse
// @Failure 403 {object} schemas.NoRightToChangeDayReportError "User doesn't have rights to create plan."
// @Router /plans [post]
func (pc *PlanController) CreatePlan(ctx *gin.Context) {
	// var payload *schemas.CreatePlanPayload

	// if err := ctx.ShouldBindJSON(&payload); err != nil {
	// 	ctx.JSON(http.StatusBadRequest, gin.H{"status": "Failed payload", "error": err.Error()})
	// 	return
	// }

	// userIDRaw, _ := ctx.Get(auth.ContextKeyUserID)
	// userID := userIDRaw.(string)

	// err := pc.permissionService.CheckIsUserHavingPermissionsForDayReport(ctx, userID, payload.DayReportUuid)
	// util.HandleErrorGin(ctx, err)

	// plan, err := pc.planService.CreatePlan(ctx, payload)
	// util.HandleErrorGin(ctx, err)

	// tags, err := pc.jobTagService.GetLabelsByIDs(ctx, plan.TagIDs)
	// util.HandleErrorGin(ctx, err)

	// response := schemas.PlanPopulatedResponse{
	// 	Uuid:          plan.ID,
	// 	CreatedAt:     plan.CreatedAt,
	// 	UpdatedAt:     plan.UpdatedAt,
	// 	Description:   plan.Description,
	// 	Time:          plan.Time,
	// 	OwnerUuid:     plan.OwnerUuid,
	// 	OwnerName:     plan.OwnerName,
	// 	IsDone:        plan.IsDone,
	// 	DayReportUuid: plan.DayReportID,
	// 	WayUUID:       plan.WayUUID,
	// 	WayName:       plan.WayName,
	// 	Tags:          tags,
	// }

	// ctx.JSON(http.StatusOK, response)
}

// Update Plan handler
// @Summary Update plan by UUID
// @Description
// @Tags plan
// @ID update-plan
// @Accept  json
// @Produce  json
// @Param request body schemas.UpdatePlanPayload true "query params"
// @Param planId path string true "plan UUID"
// @Success 200 {object} schemas.PlanPopulatedResponse
// @Failure 403 {object} schemas.NoRightToChangeDayReportError "User doesn't have rights to update plan."
// @Router /plans/{planId} [patch]
func (pc *PlanController) UpdatePlan(ctx *gin.Context) {
	// var payload *schemas.UpdatePlanPayload
	// planID := ctx.Param("planId")

	// if err := ctx.ShouldBindJSON(&payload); err != nil {
	// 	ctx.JSON(http.StatusBadRequest, gin.H{"status": "Failed payload", "error": err.Error()})
	// 	return
	// }

	// userIDRaw, _ := ctx.Get(auth.ContextKeyUserID)
	// userID := userIDRaw.(string)

	// err := pc.permissionService.CheckIsUserHavingPermissionsForPlan(ctx, userID, planID)
	// util.HandleErrorGin(ctx, err)

	// plan, err := pc.planService.UpdatePlan(ctx, &services.UpdatePlanParams{
	// 	PlanID:      planID,
	// 	Description: payload.Description,
	// 	Time:        payload.Time,
	// 	IsDone:      payload.IsDone,
	// })
	// util.HandleErrorGin(ctx, err)

	// jobTags, err := pc.jobTagService.GetLabelsByIDs(ctx, plan.TagIDs)
	// util.HandleErrorGin(ctx, err)

	// response := schemas.PlanPopulatedResponse{
	// 	Uuid:          plan.ID,
	// 	CreatedAt:     plan.CreatedAt,
	// 	UpdatedAt:     plan.UpdatedAt,
	// 	Description:   plan.Description,
	// 	Time:          plan.Time,
	// 	OwnerUuid:     plan.OwnerUuid,
	// 	OwnerName:     plan.OwnerName,
	// 	IsDone:        plan.IsDone,
	// 	DayReportUuid: plan.DayReportID,
	// 	WayUUID:       plan.WayUUID,
	// 	WayName:       plan.WayName,
	// 	Tags:          jobTags,
	// }

	// ctx.JSON(http.StatusOK, response)
}

// Deleting Plan handlers
// @Summary Delete plan by UUID
// @Description
// @Tags plan
// @ID delete-plan
// @Accept  json
// @Produce  json
// @Param planId path string true "plan ID"
// @Success 204
// @Failure 403 {object} schemas.NoRightToChangeDayReportError "User doesn't have rights to delete plan."
// @Router /plans/{planId} [delete]
func (pc *PlanController) DeletePlanById(ctx *gin.Context) {
	planID := ctx.Param("planId")

	userIDRaw, _ := ctx.Get(auth.ContextKeyUserID)
	userID := userIDRaw.(string)

	err := pc.permissionService.CheckIsUserHavingPermissionsForPlan(ctx, userID, planID)
	util.HandleErrorGin(ctx, err)

	err = pc.planService.DeletePlanById(ctx, planID)
	util.HandleErrorGin(ctx, err)

	ctx.Status(http.StatusNoContent)
}
