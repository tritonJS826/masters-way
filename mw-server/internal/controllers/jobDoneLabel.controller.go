package controllers

import (
	"mwserver/internal/schemas"
	"mwserver/internal/services"
	"mwserver/pkg/util"
	"net/http"

	"github.com/gin-gonic/gin"
)

type JobDoneLabelController struct {
	jobDoneLabelService *services.JobDoneLabelService
}

func NewJobDoneJobTagController(jobDoneLabelService *services.JobDoneLabelService) *JobDoneLabelController {
	return &JobDoneLabelController{jobDoneLabelService}
}

// Create jobDoneLabel handler
// @Summary Create a new jobDoneLabel
// @Description
// @Tags jobDoneLabel
// @ID create-jobDoneLabel
// @Accept  json
// @Produce  json
// @Param request body schemas.CreateJobDoneLabelPayload true "query params"
// @Success 204
// @Router /jobDoneLabels [post]
func (cc *JobDoneLabelController) CreateJobDoneLabel(ctx *gin.Context) {
	var payload *schemas.CreateJobDoneLabelPayload

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "Failed payload", "error": err.Error()})
		return
	}

	_, err := cc.jobDoneLabelService.CreateJobDoneLabel(ctx, payload)
	util.HandleErrorGin(ctx, err)

	ctx.Status(http.StatusNoContent)
}

// Deleting JobDoneLabel handlers
// @Summary Delete jobDoneLabel by UUID
// @Description
// @Tags jobDoneLabel
// @ID delete-jobDoneLabel
// @Accept  json
// @Produce  json
// @Param jobDoneId path string true "jobDone ID"
// @Param labelId path string true "label UUID"
// @Success 204
// @Router /jobDoneLabels/{labelId}/{jobDoneId} [delete]
func (jc *JobDoneLabelController) DeleteJobDoneLabelById(ctx *gin.Context) {
	labelID := ctx.Param("labelId")
	jobDoneID := ctx.Param("jobDoneId")

	err := jc.jobDoneLabelService.DeleteJobDoneLabelById(ctx, jobDoneID, labelID)
	util.HandleErrorGin(ctx, err)

	ctx.Status(http.StatusNoContent)
}
