package controllers

import (
	"mw-training-bff/internal/services"
	util "mw-training-bff/internal/utils"
	"net/http"

	"github.com/gin-gonic/gin"
)

type TrainingStudentController struct {
	generalService         *services.GeneralService
	trainingStudentService *services.TrainingStudentService
}

func NewTrainingStudentController(generalService *services.GeneralService, trainingStudentService *services.TrainingStudentService) *TrainingStudentController {
	return &TrainingStudentController{generalService, trainingStudentService}
}

// @Summary Create student
// @Description
// @Tags training-student
// @ID create-training-student
// @Accept json
// @Produce json
// @Param trainingId path string true "training id"
// @Param userId path string true "user id"
// @Success 200
// @Router /trainingStudents/{trainingId}/user/{userId} [post]
func (tsc *TrainingStudentController) CreateStudent(ctx *gin.Context) {
	trainingId := ctx.Param("trainingId")
	studentId := ctx.Param("userId")

	args := &services.CreateTrainingStudentParams{
		StudentUuid:  studentId,
		TrainingUuid: trainingId,
	}

	err := tsc.trainingStudentService.CreateTrainingStudent(ctx, args)
	util.HandleErrorGin(ctx, err)

	ctx.Status(http.StatusOK)
}

// @Summary Delete student
// @Description
// @Tags training-student
// @ID delete-training-student
// @Accept json
// @Produce json
// @Param trainingId path string true "training id"
// @Param userId path string true "user id"
// @Success 200
// @Router /trainingStudents/{trainingId}/user/{userId} [delete]
func (tsc *TrainingStudentController) DeleteStudent(ctx *gin.Context) {
	trainingId := ctx.Param("trainingId")
	studentId := ctx.Param("userId")

	args := &services.DeleteTrainingStudentParams{
		StudentUuid:  studentId,
		TrainingUuid: trainingId,
	}

	err := tsc.trainingStudentService.DeleteTrainingStudentByIds(ctx, args)
	util.HandleErrorGin(ctx, err)

	ctx.Status(http.StatusOK)
}
