package controllers

import (
	"mw-general-bff/internal/schemas"
	"mw-general-bff/internal/services"
	"mw-general-bff/pkg/utils"
	"net/http"

	"github.com/gin-gonic/gin"
)

type JobTagController struct {
	generalService *services.GeneralService
}

func NewJobTagController(generalService *services.GeneralService) *JobTagController {
	return &JobTagController{generalService}
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
	var payload schemas.CreateJobTagPayload

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "Failed payload", "error": err.Error()})
		return
	}

	jobTag, err := jc.generalService.CreateJobTag(ctx, &payload)
	if err != nil {
		utils.HandleErrorGin(ctx, err)
		return
	}

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
	var payload schemas.UpdateJobTagPayload
	jobTagID := ctx.Param("jobTagId")

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "Failed payload", "error": err.Error()})
		return
	}

	jobTag, err := jc.generalService.UpdateJobTag(ctx, &services.UpdateJobTagParams{
		JobTagID:    jobTagID,
		Name:        payload.Name,
		Description: payload.Description,
		Color:       payload.Color,
	})
	if err != nil {
		utils.HandleErrorGin(ctx, err)
		return
	}

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
// @Success 204
// @Router /jobTags/{jobTagId} [delete]
func (jc *JobTagController) DeleteJobTagById(ctx *gin.Context) {
	jobTagID := ctx.Param("jobTagId")

	err := jc.generalService.DeleteJobTagById(ctx, jobTagID)
	utils.HandleErrorGin(ctx, err)

	ctx.Status(http.StatusNoContent)
}
