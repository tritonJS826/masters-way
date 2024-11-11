package controllers

import (
	"mwserver/internal/auth"
	"mwserver/internal/customErrors"
	"mwserver/internal/schemas"
	"mwserver/internal/services"
	"mwserver/pkg/util"
	"net/http"

	"github.com/gin-gonic/gin"
)

// Without next lines swagger does not see openapi models
var _ = &customErrors.NoRightToChangeDayReportError{}

type JobDoneController struct {
	permissionService    *services.PermissionService
	jobDoneService       *services.JobDoneService
	jobDoneJobTagService *services.JobDoneJobTagService
	jobTagService        *services.JobTagService
}

func NewJobDoneController(
	permissionService *services.PermissionService,
	jobDoneService *services.JobDoneService,
	jobDoneJobTagService *services.JobDoneJobTagService,
	jobTagService *services.JobTagService,
) *JobDoneController {
	return &JobDoneController{permissionService, jobDoneService, jobDoneJobTagService, jobTagService}
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
func (jc *JobDoneController) CreateJobDone(ctx *gin.Context) {
	var payload *schemas.CreateJobDonePayload

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "Failed payload", "error": err.Error()})
		return
	}

	userIDRaw, _ := ctx.Get(auth.ContextKeyUserID)
	userID := userIDRaw.(string)

	err := jc.permissionService.CheckIsUserHavingPermissionsForDayReport(ctx, userID, payload.DayReportUuid)
	util.HandleErrorGin(ctx, err)

	jobDone, err := jc.jobDoneService.CreateJobDone(ctx, payload)
	util.HandleErrorGin(ctx, err)

	for _, jobTagID := range payload.JobTagUuids {
		_, err := jc.jobDoneJobTagService.CreateJobDoneJobTag(ctx, &schemas.CreateJobDoneJobTagPayload{
			JobDoneUuid: jobDone.ID,
			JobTagUuid:  jobTagID,
		})
		util.HandleErrorGin(ctx, err)
	}

	jobTags, err := jc.jobTagService.GetLabelsByIDs(ctx, payload.JobTagUuids)
	util.HandleErrorGin(ctx, err)

	response := schemas.JobDonePopulatedResponse{
		Uuid:          jobDone.ID,
		CreatedAt:     jobDone.CreatedAt,
		UpdatedAt:     jobDone.UpdatedAt,
		Description:   jobDone.Description,
		Time:          jobDone.Time,
		OwnerUuid:     jobDone.OwnerUuid,
		OwnerName:     jobDone.OwnerName,
		DayReportUuid: jobDone.DayReportID,
		WayUUID:       jobDone.WayUUID,
		WayName:       jobDone.WayName,
		Tags:          jobTags,
	}

	ctx.JSON(http.StatusOK, response)
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
func (jc *JobDoneController) UpdateJobDone(ctx *gin.Context) {
	var payload *schemas.UpdateJobDone
	jobDoneID := ctx.Param("jobDoneId")

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "Failed payload", "error": err.Error()})
		return
	}

	userIDRaw, _ := ctx.Get(auth.ContextKeyUserID)
	userID := userIDRaw.(string)

	err := jc.permissionService.CheckIsUserHavingPermissionsForJobDone(ctx, userID, jobDoneID)
	util.HandleErrorGin(ctx, err)

	jobDone, err := jc.jobDoneService.UpdateJobDone(ctx, &services.UpdateJobDoneParams{
		JobDoneID:   jobDoneID,
		Description: payload.Description,
		Time:        payload.Time,
	})
	util.HandleErrorGin(ctx, err)

	jobTags, err := jc.jobTagService.GetLabelsByIDs(ctx, jobDone.TagIDs)
	util.HandleErrorGin(ctx, err)

	response := schemas.JobDonePopulatedResponse{
		Uuid:          jobDone.ID,
		CreatedAt:     jobDone.CreatedAt,
		UpdatedAt:     jobDone.UpdatedAt,
		Description:   jobDone.Description,
		Time:          jobDone.Time,
		OwnerUuid:     jobDone.OwnerUuid,
		OwnerName:     jobDone.OwnerName,
		DayReportUuid: jobDone.DayReportID,
		WayUUID:       jobDone.WayUUID,
		WayName:       jobDone.WayName,
		Tags:          jobTags,
	}

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
// @Success 204
// @Failure 403 {object} customErrors.NoRightToChangeDayReportError "User doesn't have rights to delete job done."
// @Router /jobDones/{jobDoneId} [delete]
func (jc *JobDoneController) DeleteJobDoneById(ctx *gin.Context) {
	jobDoneID := ctx.Param("jobDoneId")

	userIDRaw, _ := ctx.Get(auth.ContextKeyUserID)
	userID := userIDRaw.(string)

	err := jc.permissionService.CheckIsUserHavingPermissionsForJobDone(ctx, userID, jobDoneID)
	util.HandleErrorGin(ctx, err)

	err = jc.jobDoneService.DeleteJobDoneByID(ctx, jobDoneID)
	util.HandleErrorGin(ctx, err)

	ctx.Status(http.StatusNoContent)
}
