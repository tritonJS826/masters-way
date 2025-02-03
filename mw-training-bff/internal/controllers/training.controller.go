package controllers

import (
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
// @Param trainingId path string true "training id"
// @Success 200 {object} schemas.Training
// @Router /trainings/{trainingId} [post]
func (nc *TrainingController) CreateTraining(ctx *gin.Context) {
	// userUUID := ctx.Value(auth.ContextKeyUserID).(string)
	// page := ctx.DefaultQuery("page", "1")
	// limit := ctx.DefaultQuery("limit", "50")
	// isOnlyNew := ctx.DefaultQuery("isOnlyNew", "false")

	// reqPage, _ := strconv.Atoi(page)
	// reqLimit, _ := strconv.Atoi(limit)
	// reqIsOnlyNew, err := strconv.ParseBool(isOnlyNew)

	// getNotificationListParams := &services.GetNotificationListParams{
	// 	UserUUID:  userUUID,
	// 	Page:      int32(reqPage),
	// 	Limit:     int32(reqLimit),
	// 	IsOnlyNew: reqIsOnlyNew,
	// }

	// response, err := nc.notificationService.GetNotificationList(ctx, getNotificationListParams)
	// utils.HandleErrorGin(ctx, err)
	stub := schemas.Training{}

	ctx.JSON(http.StatusOK, stub)
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
func (nc *TrainingController) UpdateTraining(ctx *gin.Context) {
	// var payload *schemas.UpdateNotificationPayload
	// notificationUUID := ctx.Param("notificationId")

	// if err := ctx.ShouldBindJSON(&payload); err != nil {
	// 	ctx.JSON(http.StatusBadRequest, gin.H{"status": "Failed payload", "error": err.Error()})
	// 	return
	// }

	// response, err := nc.notificationService.UpdateNotification(ctx, notificationUUID, payload.IsRead)
	// utils.HandleErrorGin(ctx, err)

	stub := schemas.Training{}

	ctx.JSON(http.StatusOK, stub)
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
func (nc *TrainingController) DeleteTraining(ctx *gin.Context) {
	// var payload *schemas.UpdateNotificationPayload
	// notificationUUID := ctx.Param("notificationId")

	// if err := ctx.ShouldBindJSON(&payload); err != nil {
	// 	ctx.JSON(http.StatusBadRequest, gin.H{"status": "Failed payload", "error": err.Error()})
	// 	return
	// }

	// response, err := nc.notificationService.UpdateNotification(ctx, notificationUUID, payload.IsRead)
	// utils.HandleErrorGin(ctx, err)

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
func (nc *TrainingController) GetTrainingListByUser(ctx *gin.Context) {
	// var payload *schemas.UpdateNotificationPayload
	// notificationUUID := ctx.Param("notificationId")

	// userIDRaw, _ := ctx.Get(auth.ContextKeyUserID)
	// userID := userIDRaw.(string)

	// if err := ctx.ShouldBindJSON(&payload); err != nil {
	// 	ctx.JSON(http.StatusBadRequest, gin.H{"status": "Failed payload", "error": err.Error()})
	// 	return
	// }

	// response, err := nc.notificationService.UpdateNotification(ctx, notificationUUID, payload.IsRead)
	// utils.HandleErrorGin(ctx, err)

	stub := schemas.TrainingList{}

	ctx.JSON(http.StatusOK, stub)
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
func (nc *TrainingController) GetTrainingById(ctx *gin.Context) {
	// var payload *schemas.UpdateNotificationPayload
	// notificationUUID := ctx.Param("notificationId")

	// if err := ctx.ShouldBindJSON(&payload); err != nil {
	// 	ctx.JSON(http.StatusBadRequest, gin.H{"status": "Failed payload", "error": err.Error()})
	// 	return
	// }

	// response, err := nc.notificationService.UpdateNotification(ctx, notificationUUID, payload.IsRead)
	// utils.HandleErrorGin(ctx, err)

	stub := schemas.Training{}

	ctx.JSON(http.StatusOK, stub)
}
