package controllers

import (
	"mw-training-bff/internal/auth"
	"mw-training-bff/internal/schemas"
	"mw-training-bff/internal/services"
	util "mw-training-bff/internal/utils"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

type TrainingController struct {
	generalService  *services.GeneralService
	trainingService *services.TrainingService
}

func NewTrainingController(generalService *services.GeneralService, trainingService *services.TrainingService) *TrainingController {
	return &TrainingController{generalService, trainingService}
}

// @Summary Create training
// @Description
// @Tags training
// @ID create-training
// @Accept json
// @Produce json
// @Param request body schemas.CreateTrainingPayload true "query params"
// @Success 200 {object} schemas.Training
// @Router /trainings [post]
func (tc *TrainingController) CreateTraining(ctx *gin.Context) {
	userIDRaw, _ := ctx.Get(auth.ContextKeyUserID)
	userID := userIDRaw.(string)
	var payload *schemas.CreateTrainingPayload

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	args := &services.CreateTrainingParams{
		Name:        payload.Name,
		UserId:      userID,
		Description: payload.Description,
		IsPrivate:   payload.IsPrivate,
	}
	trainings, err := tc.trainingService.CreateTraining(ctx, args)
	util.HandleErrorGin(ctx, err)

	ctx.JSON(http.StatusOK, trainings)
}

// @Summary Update training by id
// @Description
// @Tags training
// @ID update-training
// @Accept json
// @Produce json
// @Param request body schemas.UpdateTrainingPayload true "query params"
// @Param trainingId path string true "training id"
// @Success 200 {object} schemas.Training
// @Router /trainings/{trainingId} [patch]
func (tc *TrainingController) UpdateTraining(ctx *gin.Context) {
	userIDRaw, _ := ctx.Get(auth.ContextKeyUserID)
	userID := userIDRaw.(string)
	var payload *schemas.UpdateTrainingPayload
	trainingId := ctx.Param("trainingId")

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "Failed payload", "error": err.Error()})
		return
	}

	args := &services.UpdateTrainingParams{
		TrainingUuid: trainingId,
		Description:  payload.Description,
		IsPrivate:    payload.IsPrivate,
		OwnerUuid:    userID,
		Name:         payload.Name,
	}

	training, err := tc.trainingService.UpdateTraining(ctx, args)
	util.HandleErrorGin(ctx, err)

	ctx.JSON(http.StatusOK, training)
}

// @Summary Delete training by id
// @Description
// @Tags training
// @ID delete-training
// @Accept json
// @Produce json
// @Param trainingId path string true "training id"
// @Success 200
// @Router /trainings/{trainingId} [delete]
func (tc *TrainingController) DeleteTraining(ctx *gin.Context) {
	trainingId := ctx.Param("trainingId")

	err := tc.trainingService.DeleteTraining(ctx, trainingId)
	util.HandleErrorGin(ctx, err)

	ctx.Status(http.StatusOK)
}

// @Summary GEt training list
// @Description
// @Tags training
// @ID get-training-list
// @Accept json
// @Produce json
// @Param page query integer false "Page number for pagination - 1 by default"
// @Param limit query integer false "Number of items per page - 50 by default"
// @Param trainingName query string false "Training name"
// @Success 200 {object} schemas.TrainingList
// @Router /trainings [get]
func (nc *TrainingController) GetTrainingList(ctx *gin.Context) {
	pageRaw := ctx.DefaultQuery("page", "1")
	limitRaw := ctx.DefaultQuery("limit", "10")
	trainingName := ctx.DefaultQuery("trainingName", "")

	page, err := strconv.Atoi(pageRaw)
	util.HandleErrorGin(ctx, err)
	limit, err := strconv.Atoi(limitRaw)
	util.HandleErrorGin(ctx, err)

	args := &services.GetTrainingListParams{
		Page:         page,
		Limit:        limit,
		TrainingName: trainingName,
	}

	trainingList, err := nc.trainingService.GetTrainingList(ctx, args)
	util.HandleErrorGin(ctx, err)

	ctx.JSON(http.StatusOK, trainingList)
}

// @Summary Get training list by user
// @Description
// @Tags training
// @ID get-training-list-by-user
// @Accept json
// @Produce json
// @Param trainingsType query string true "enum: student | mentor | owner | favorite"
// @Param userId path string true "user id"
// @Success 200 {object} schemas.TrainingList
// @Router /trainings/users/{userId} [get]
func (tc *TrainingController) GetTrainingListByUser(ctx *gin.Context) {
	userUuid := ctx.Param("userId")
	trainingsType := ctx.Query("trainingsType")

	// TODO add showing own private trainings
	// userIDRaw, _ := ctx.Get(auth.ContextKeyUserID)
	// userID := userIDRaw.(string)

	args := &services.GetTrainingListByUserParams{
		UserUUID:     userUuid,
		TrainingType: trainingsType,
	}

	trainings, err := tc.trainingService.GetTrainingListByUser(ctx, args)
	util.HandleErrorGin(ctx, err)

	ctx.JSON(http.StatusOK, *trainings)
}

// @Summary Get training by Id
// @Description
// @Tags training
// @ID get-training-by-id
// @Accept json
// @Produce json
// @Param trainingId path string true "training id"
// @Success 200 {object} schemas.Training
// @Router /trainings/{trainingId} [get]
func (tc *TrainingController) GetTrainingById(ctx *gin.Context) {
	trainingId := ctx.Param("trainingId")

	training, err := tc.trainingService.GetTrainingById(ctx, trainingId)
	util.HandleErrorGin(ctx, err)

	ctx.JSON(http.StatusOK, training)
}
