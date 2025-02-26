package controllers

import (
	"mw-training-bff/internal/schemas"
	"mw-training-bff/internal/services"
	util "mw-training-bff/internal/utils"
	"net/http"

	"github.com/gin-gonic/gin"
)

type PracticeMaterialController struct {
	generalService          *services.GeneralService
	practiceMaterialService *services.PracticeMaterialService
}

func NewPracticeMaterialController(generalService *services.GeneralService, practiceMaterialService *services.PracticeMaterialService) *PracticeMaterialController {
	return &PracticeMaterialController{generalService, practiceMaterialService}
}

// @Summary Get practice material by topic id
// @Description
// @Tags practice-material
// @ID get-practice-materials-by-topic-id
// @Accept json
// @Produce json
// @Param topicId path string true "topic id"
// @Success 200 {object} schemas.PracticeMaterials
// @Router /practiceMaterials/{topicId} [get]
func (pmc *PracticeMaterialController) GetPracticeMaterialsByTopicId(ctx *gin.Context) {
	topicIdRaw := ctx.Param("topicId")

	args := &services.GetPracticeMaterialsByTopicIdParams{
		TopicId: topicIdRaw,
	}

	response, err := pmc.practiceMaterialService.GetPracticeMaterialsByTopicId(ctx, args)
	util.HandleErrorGin(ctx, err)

	ctx.JSON(http.StatusOK, response)
}

// @Summary Create practice material
// @Description
// @Tags practice-material
// @ID create-practice-material
// @Accept json
// @Produce json
// @Param request body schemas.CreatePracticeMaterialPayload true "query params, client must use for PracticeType: 'input_word'"
// @Success 200 {object} schemas.PracticeMaterial
// @Router /practiceMaterials [post]
func (pmc *PracticeMaterialController) CreatePracticeMaterial(ctx *gin.Context) {
	var payload *schemas.PracticeMaterial

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "Failed payload", "error": err.Error()})
		return
	}

	args := &services.CreatePracticeMaterialParams{
		TopicId:      payload.TopicUuid,
		Name:         payload.Name,
		Order:        payload.PracticeMaterialOrder,
		Description:  payload.TaskDescription,
		Answer:       payload.Answer,
		PracticeType: payload.PracticeType,
		TimeToAnswer: payload.TimeToAnswer,
	}

	response, err := pmc.practiceMaterialService.CreatePracticeMaterial(ctx, args)
	util.HandleErrorGin(ctx, err)

	ctx.JSON(http.StatusOK, response)
}

// @Summary Update practice material
// @Description
// @Tags practice-material
// @ID update-practice-material
// @Accept json
// @Produce json
// @Param request body schemas.UpdatePracticeMaterialPayload true "query params"
// @Success 200 {object} schemas.PracticeMaterial
// @Router /practiceMaterials [patch]
func (nc *PracticeMaterialController) UpdatePracticeMaterial(ctx *gin.Context) {
	// userUUID := ctx.Value(auth.ContextKeyUserID).(string)
	// response, err := nc.notificationService.GetNotificationSettingList(ctx, userUUID)
	// utils.HandleErrorGin(ctx, err)

	stub := schemas.PracticeMaterial{}
	ctx.JSON(http.StatusOK, stub)
}

// @Summary Delete practice material
// @Description
// @Tags practice-material
// @ID delete-practice-material
// @Accept json
// @Produce json
// @Param practiceMaterialId path string true "practice material id"
// @Success 200
// @Router /practiceMaterials/{practiceMaterialId} [delete]
func (nc *PracticeMaterialController) DeletePracticeMaterial(ctx *gin.Context) {
	// var payload *schemas.UpdateNotificationSettingPayload

	// if err := ctx.ShouldBindJSON(&payload); err != nil {
	// 	ctx.JSON(http.StatusBadRequest, gin.H{"status": "Failed payload", "error": err.Error()})
	// 	return
	// }

	// notificationID := ctx.Param("notificationSettingId")

	// response, err := nc.notificationService.UpdateNotificationSetting(ctx, notificationID, payload.IsEnabled)
	// utils.HandleErrorGin(ctx, err)

	ctx.Status(http.StatusOK)
}
