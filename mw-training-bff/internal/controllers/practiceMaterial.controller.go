package controllers

import (
	"mw-training-bff/internal/schemas"
	"mw-training-bff/internal/services"
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
func (nc *PracticeMaterialController) GetPracticeMaterialsByTopicId(ctx *gin.Context) {
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

	stub := schemas.PracticeMaterials{
		Size:              10,
		PracticeMaterials: []schemas.PracticeMaterial{},
	}

	ctx.JSON(http.StatusOK, stub)
}

// @Summary Create practice material
// @Description
// @Tags practice-material
// @ID create-practice-material
// @Accept json
// @Produce json
// @Param request body schemas.CreatePracticeMaterialPayload true "query params"
// @Param topicId path string true "topic id"
// @Success 200 {object} schemas.PracticeMaterial
// @Router /practiceMaterials/{topicId} [post]
func (nc *PracticeMaterialController) CreatePracticeMaterial(ctx *gin.Context) {
	// 	var payload *schemas.UpdateNotificationPayload
	// 	notificationUUID := ctx.Param("notificationId")

	// 	if err := ctx.ShouldBindJSON(&payload); err != nil {
	// 		ctx.JSON(http.StatusBadRequest, gin.H{"status": "Failed payload", "error": err.Error()})
	// 		return
	// 	}

	// 	response, err := nc.notificationService.UpdateNotification(ctx, notificationUUID, payload.IsRead)
	// 	utils.HandleErrorGin(ctx, err)

	stub := schemas.PracticeMaterial{}

	ctx.JSON(http.StatusOK, stub)
}

// @Summary Update practice material
// @Description
// @Tags practice-material
// @ID update-practice-material
// @Accept json
// @Produce json
// @Param request body schemas.UpdatePracticeMaterialPayload true "query params"
// @Param practiceMaterialId path string true "practice material id"
// @Success 200 {object} schemas.PracticeMaterial
// @Router /practiceMaterials/{practiceMaterialId} [patch]
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
