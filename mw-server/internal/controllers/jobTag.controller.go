package controllers

import (
	"mwserver/internal/schemas"
	"mwserver/internal/services"
	"mwserver/pkg/util"
	"net/http"

	"github.com/gin-gonic/gin"
)

type JobTagController struct {
	jobTagService *services.JobTagService
}

func NewJobTagController(jobTagService *services.JobTagService) *JobTagController {
	return &JobTagController{jobTagService}
}

// Create wayTag  handler
// @Summary Create a new jobTag
// @Description
// @Tags jobTag
// @ID create-jobTag
// @Accept  json
// @Produce  json
// @Param request body schemas.CreateJobTagPayload true "query params"
// @Success 200 {object} schemas.JobTagResponse
// @Router /jobTags [post]
func (jc *JobTagController) CreateJobTag(ctx *gin.Context) {
	var payload *schemas.CreateJobTagPayload

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "Failed payload", "error": err.Error()})
		return
	}

	jobTag, err := jc.jobTagService.CreateJobTag(ctx, payload)
	util.HandleErrorGin(ctx, err)

	ctx.JSON(http.StatusOK, jobTag)
}

// Update jobTag handler
// @Summary Update jobTag by UUID
// @Description
// @Tags jobTag
// @ID update-jobTag
// @Accept  json
// @Produce  json
// @Param request body schemas.UpdateJobTagPayload true "query params"
// @Param jobTagId path string true "jobTag UUID"
// @Success 200 {object} schemas.JobTagResponse
// @Router /jobTags/{jobTagId} [patch]
func (jc *JobTagController) UpdateJobTag(ctx *gin.Context) {
	var payload *schemas.UpdateJobTagPayload
	jobTagID := ctx.Param("jobTagId")

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "Failed payload", "error": err.Error()})
		return
	}

	jobTag, err := jc.jobTagService.UpdateJobTag(ctx, &services.UpdateJobTagParams{
		JobTagID:    jobTagID,
		Name:        payload.Name,
		Description: payload.Description,
		Color:       payload.Color,
	})
	util.HandleErrorGin(ctx, err)

	ctx.JSON(http.StatusOK, jobTag)
}

// Deleting wayTag handlers
// @Summary Delete jobTag by UUID
// @Description
// @Tags jobTag
// @ID delete-jobTag
// @Accept  json
// @Produce  json
// @Param jobTagId path string true "jobTag ID"
// @Success 200
// @Router /jobTags/{jobTagId} [delete]
func (jc *JobTagController) DeleteJobTagById(ctx *gin.Context) {
	jobTagID := ctx.Param("jobTagId")

	err := jc.jobTagService.DeleteJobTagById(ctx, jobTagID)
	util.HandleErrorGin(ctx, err)

	ctx.JSON(http.StatusOK, gin.H{"status": "successfully deleted"})
}
