package controllers

import (
	"mw-server/internal/schemas"
	"mw-server/internal/services"
	"mw-server/pkg/util"
	"net/http"

	"github.com/gin-gonic/gin"
)

type JobDoneJobTagController struct {
	jobDoneJobTagService *services.JobDoneJobTagService
}

func NewJobDoneJobTagController(jobDoneJobTagService *services.JobDoneJobTagService) *JobDoneJobTagController {
	return &JobDoneJobTagController{jobDoneJobTagService}
}

// Create jobDoneJobTag handler
// @Summary Create a new jobDoneJobTag
// @Description
// @Tags jobDoneJobTag
// @ID create-jobDoneJobTag
// @Accept  json
// @Produce  json
// @Param request body schemas.CreateJobDoneJobTagPayload true "query params"
// @Success 204
// @Router /jobDoneJobTags [post]
func (cc *JobDoneJobTagController) CreateJobDoneJobTag(ctx *gin.Context) {
	var payload *schemas.CreateJobDoneJobTagPayload

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "Failed payload", "error": err.Error()})
		return
	}

	_, err := cc.jobDoneJobTagService.CreateJobDoneJobTag(ctx, payload)
	util.HandleErrorGin(ctx, err)

	ctx.Status(http.StatusNoContent)
}

// Deleting JobDoneJobTag handlers
// @Summary Delete jobDoneJobTag by UUID
// @Description
// @Tags jobDoneJobTag
// @ID delete-jobDoneJobTag
// @Accept  json
// @Produce  json
// @Param jobDoneId path string true "jobDone ID"
// @Param jobTagId path string true "jobTag UUID"
// @Success 204
// @Router /jobDoneJobTags/{jobTagId}/{jobDoneId} [delete]
func (jc *JobDoneJobTagController) DeleteJobDoneJobTagById(ctx *gin.Context) {
	jobTagID := ctx.Param("jobTagId")
	jobDoneID := ctx.Param("jobDoneId")

	err := jc.jobDoneJobTagService.DeleteJobDoneJobTagById(ctx, jobDoneID, jobTagID)
	util.HandleErrorGin(ctx, err)

	ctx.Status(http.StatusNoContent)
}
