package controllers

import (
	"mw-training-bff/internal/schemas"
	"mw-training-bff/internal/services"
	util "mw-training-bff/internal/utils"
	"net/http"

	"github.com/gin-gonic/gin"
)

// This line required to import schemas for swagger
var stubModel schemas.CreateTrainingTrainingTagPayload

type TrainingTrainingTagController struct {
	generalService             *services.GeneralService
	trainingTrainingTagService *services.TrainingTrainingTagService
}

func NewTrainingTrainingTagController(generalService *services.GeneralService, trainingTrainingTagService *services.TrainingTrainingTagService) *TrainingTrainingTagController {
	return &TrainingTrainingTagController{generalService, trainingTrainingTagService}
}

// @Summary Create training training tag
// @Description
// @Tags training-training-tag
// @ID create-training-training-tag
// @Accept json
// @Produce json
// @Param request body schemas.CreateTrainingTrainingTagPayload true "query params"
// @Param trainingId path string true "training id"
// @Success 200
// @Router /trainingTrainingTags/{trainingId} [post]
func (tttc *TrainingTrainingTagController) CreateTrainingTag(ctx *gin.Context) {
	trainingId := ctx.Param("trainingId")
	var payload *schemas.CreateTrainingTrainingTagPayload

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "Failed payload", "error": err.Error()})
		return
	}

	args := &services.CreateTrainingTrainingTagParams{
		TrainingUuid: trainingId,
		TagName:      payload.Name,
	}

	_, err := tttc.trainingTrainingTagService.CreateTrainingTrainingTag(ctx, args)
	util.HandleErrorGin(ctx, err)

	ctx.Status(http.StatusOK)
}

// @Summary Delete training training tag
// @Description
// @Tags training-training-tag
// @ID delete-training-training-tag
// @Accept json
// @Produce json
// @Param trainingId path string true "training id"
// @Param trainingTagName path string true "training tag name"
// @Success 200
// @Router /trainingTrainingTags/{trainingId}/trainingTag/{trainingTagName} [delete]
func (tttc *TrainingTrainingTagController) DeleteTrainingTag(ctx *gin.Context) {
	trainingId := ctx.Param("trainingId")
	trainingTagName := ctx.Param("trainingTagId")

	args := &services.DeleteTrainingTrainingTagParams{
		TrainingUuid: trainingId,
		TagName:      trainingTagName,
	}

	err := tttc.trainingTrainingTagService.DeleteTrainingTrainingTag(ctx, args)
	util.HandleErrorGin(ctx, err)

	ctx.Status(http.StatusOK)
}
