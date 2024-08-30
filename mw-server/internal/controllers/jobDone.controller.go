package controllers

import (
	"mwserver/internal/auth"
	"mwserver/internal/schemas"
	"mwserver/internal/services"
	"mwserver/pkg/util"
	"net/http"

	"github.com/gin-gonic/gin"
)

type JobDoneController struct {
	permissionService *services.PermissionService
	jobDoneService    *services.JobDoneService
}

func NewJobDoneController(permissionService *services.PermissionService, jobDoneService *services.JobDoneService) *JobDoneController {
	return &JobDoneController{permissionService, jobDoneService}
}

// Create JobDone  handler
// @Summary Create a new jobDone
// @Description
// @Tags jobDone
// @ID create-jobDone
// @Accept  json
// @Produce  json
// @Param request body schemas.CreateJobDonePayload true "query params"
// @Success 200 {object} schemas.JobDonePopulatedResponse
// @Failure 403 {object} customErrors.NoRightToChangeDayReportError "User doesn't have rights to create job done."
// @Router /jobDones [post]
func (jdc *JobDoneController) CreateJobDone(ctx *gin.Context) {
	var payload *schemas.CreateJobDonePayload

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "Failed payload", "error": err.Error()})
		return
	}

	userIDRaw, _ := ctx.Get(auth.ContextKeyUserID)
	userID := userIDRaw.(string)

	err := jdc.permissionService.CheckIsUserHavingPermissionsForDayReport(ctx, userID, payload.DayReportUuid)
	util.HandleErrorGin(ctx, err)

	jobDone, err := jdc.jobDoneService.CreateJobDone(ctx, payload)
	util.HandleErrorGin(ctx, err)

	ctx.JSON(http.StatusOK, jobDone)
}

// Update JobDone handler
// @Summary Update jobDone by UUID
// @Description
// @Tags jobDone
// @ID update-jobDone
// @Accept  json
// @Produce  json
// @Param request body schemas.UpdateJobDone true "query params"
// @Param jobDoneId path string true "jobDone UUID"
// @Success 200 {object} schemas.JobDonePopulatedResponse
// @Failure 403 {object} customErrors.NoRightToChangeDayReportError "User doesn't have rights to update job done."
// @Router /jobDones/{jobDoneId} [patch]
func (jdc *JobDoneController) UpdateJobDone(ctx *gin.Context) {
	var payload *schemas.UpdateJobDone
	jobDoneID := ctx.Param("jobDoneId")

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "Failed payload", "error": err.Error()})
		return
	}

	userIDRaw, _ := ctx.Get(auth.ContextKeyUserID)
	userID := userIDRaw.(string)

	err := jdc.permissionService.CheckIsUserHavingPermissionsForJobDone(ctx, userID, jobDoneID)
	util.HandleErrorGin(ctx, err)

	response, err := jdc.jobDoneService.UpdateJobDone(ctx, &services.UpdateJobDoneParams{
		JobDoneID:   jobDoneID,
		Description: payload.Description,
		Time:        payload.Time,
	})
	util.HandleErrorGin(ctx, err)

	ctx.JSON(http.StatusOK, response)
}

// Deleting jobDone handlers
// @Summary Delete jobDone by UUID
// @Description
// @Tags jobDone
// @ID delete-jobDone
// @Accept  json
// @Produce  json
// @Param jobDoneId path string true "jobDone ID"
// @Success 200
// @Failure 403 {object} customErrors.NoRightToChangeDayReportError "User doesn't have rights to delete job done."
// @Router /jobDones/{jobDoneId} [delete]
func (jdc *JobDoneController) DeleteJobDoneById(ctx *gin.Context) {
	jobDoneID := ctx.Param("jobDoneId")

	userIDRaw, _ := ctx.Get(auth.ContextKeyUserID)
	userID := userIDRaw.(string)

	err := jdc.permissionService.CheckIsUserHavingPermissionsForJobDone(ctx, userID, jobDoneID)
	util.HandleErrorGin(ctx, err)

	err = jdc.jobDoneService.DeleteJobDoneById(ctx, jobDoneID)
	util.HandleErrorGin(ctx, err)

	ctx.JSON(http.StatusOK, gin.H{"status": "successfully deleted"})
}
