package controllers

import (
	"mw-general-bff/internal/schemas"
	"mw-general-bff/internal/services"
	"mw-general-bff/pkg/utils"
	"net/http"

	"github.com/gin-gonic/gin"
)

type JobDoneController struct {
	generalService *services.GeneralService
}

func NewJobDoneController(generalService *services.GeneralService) *JobDoneController {
	return &JobDoneController{generalService}
}

// Create JobDone handler
// @Summary Create a new jobDone
// @Description
// @Tags jobDone
// @ID create-jobDone
// @Accept  json
// @Produce  json
// @Param request body schemas.CreateJobDonePayload true "query params"
// @Success 200 {object} openapiGeneral.MwserverInternalSchemasJobDonePopulatedResponse
// @Router /jobDones [post]
func (jc *JobDoneController) CreateJobDone(ctx *gin.Context) {
	var payload *schemas.CreateJobDonePayload

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "Failed payload", "error": err.Error()})
		return
	}

	response, err := jc.generalService.CreateJobDone(ctx, payload)
	utils.HandleErrorGin(ctx, err)

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
// @Success 200 {object} openapiGeneral.MwserverInternalSchemasJobDonePopulatedResponse
// @Router /jobDones/{jobDoneId} [patch]
func (jc *JobDoneController) UpdateJobDone(ctx *gin.Context) {
	var payload *schemas.UpdateJobDone
	jobDoneID := ctx.Param("jobDoneId")

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "Failed payload", "error": err.Error()})
		return
	}

	params := &services.UpdateJobDoneParams{
		JobDoneID:   jobDoneID,
		Description: payload.Description,
		Time:        payload.Time,
	}

	response, err := jc.generalService.UpdateJobDone(ctx, params)
	utils.HandleErrorGin(ctx, err)

	ctx.JSON(http.StatusOK, response)
}

// Deleting jobDone handler
// @Summary Delete jobDone by UUID
// @Description
// @Tags jobDone
// @ID delete-jobDone
// @Accept  json
// @Produce  json
// @Param jobDoneId path string true "jobDone ID"
// @Success 204
// @Router /jobDones/{jobDoneId} [delete]
func (jc *JobDoneController) DeleteJobDoneById(ctx *gin.Context) {
	jobDoneID := ctx.Param("jobDoneId")

	err := jc.generalService.DeleteJobDoneByID(ctx, jobDoneID)
	utils.HandleErrorGin(ctx, err)

	ctx.Status(http.StatusNoContent)
}
