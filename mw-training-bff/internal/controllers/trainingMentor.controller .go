package controllers

import (
	"mw-training-bff/internal/services"
	util "mw-training-bff/internal/utils"
	"net/http"

	"github.com/gin-gonic/gin"
)

type TrainingMentorController struct {
	generalService        *services.GeneralService
	trainingMentorService *services.TrainingMentorService
}

func NewTrainingMentorController(generalService *services.GeneralService, trainingMentorService *services.TrainingMentorService) *TrainingMentorController {
	return &TrainingMentorController{generalService, trainingMentorService}
}

// @Summary Create mentor
// @Description
// @Tags training-mentor
// @ID create-training-mentor
// @Accept json
// @Produce json
// @Param trainingId path string true "training id"
// @Param userId path string true "user id"
// @Success 200
// @Router /trainingMentors/{trainingId}/user/{userId} [post]
func (tmc *TrainingMentorController) CreateMentor(ctx *gin.Context) {
	trainingId := ctx.Param("trainingId")
	mentorId := ctx.Param("userId")

	args := &services.CreateTrainingMentorParams{
		MentorUuid:   mentorId,
		TrainingUuid: trainingId,
	}

	err := tmc.trainingMentorService.CreateTrainingMentor(ctx, args)
	util.HandleErrorGin(ctx, err)

	ctx.Status(http.StatusOK)
}

// @Summary Delete mentor by id
// @Description
// @Tags training-mentor
// @ID delete-training-mentor
// @Accept json
// @Produce json
// @Param trainingId path string true "training id"
// @Param userId path string true "user id"
// @Success 200
// @Router /trainingMentors/{trainingId}/user/{userId} [delete]
func (tmc *TrainingMentorController) DeleteMentor(ctx *gin.Context) {
	trainingId := ctx.Param("trainingId")
	mentorId := ctx.Param("userId")

	args := &services.DeleteTrainingMentorParams{
		MentorUuid:   mentorId,
		TrainingUuid: trainingId,
	}

	err := tmc.trainingMentorService.DeleteTrainingMentorByIds(ctx, args)
	util.HandleErrorGin(ctx, err)

	ctx.Status(http.StatusOK)
}
