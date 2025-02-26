package controllers

import (
	"mw-training-bff/internal/schemas"
	"mw-training-bff/internal/services"
	util "mw-training-bff/internal/utils"
	"net/http"

	"github.com/gin-gonic/gin"
)

type TheoryMaterialController struct {
	generalService        *services.GeneralService
	theoryMaterialService *services.TheoryMaterialService
}

func NewTheoryMaterialController(generalService *services.GeneralService, theoryMaterialService *services.TheoryMaterialService) *TheoryMaterialController {
	return &TheoryMaterialController{generalService, theoryMaterialService}
}

// @Summary Get theory material by topic id
// @Description
// @Tags theory-material
// @ID get-theory-materials-by-topic-id
// @Accept json
// @Produce json
// @Param topicId path string true "topic id"
// @Success 200 {object} schemas.TheoryMaterials
// @Router /theoryMaterials/{topicId} [get]
func (nc *TheoryMaterialController) GetTheoryMaterialsByTopicId(ctx *gin.Context) {
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

	stub := schemas.TheoryMaterials{
		Size:            10,
		TheoryMaterials: []schemas.TheoryMaterial{},
	}

	ctx.JSON(http.StatusOK, stub)
}

// @Summary Create theory material
// @Description
// @Tags theory-material
// @ID create-theory-material
// @Accept json
// @Produce json
// @Param request body schemas.CreateTheoryMaterialPayload true "query params"
// @Success 200 {object} schemas.TheoryMaterial
// @Router /theoryMaterials [post]
func (tmc *TheoryMaterialController) CreateTheoryMaterial(ctx *gin.Context) {
	var payload *schemas.CreateTheoryMaterialPayload

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "Failed payload", "error": err.Error()})
		return
	}

	args := &services.CreateTheoryMaterialParams{
		TopicId:     payload.TopicUuid,
		Name:        payload.Name,
		Description: payload.Description,
	}

	response, err := tmc.theoryMaterialService.CreateTheoryMaterial(ctx, args)
	util.HandleErrorGin(ctx, err)

	ctx.JSON(http.StatusOK, response)
}

// @Summary Update theory material
// @Description
// @Tags theory-material
// @ID update-theory-material
// @Accept json
// @Produce json
// @Param request body schemas.UpdateTheoryMaterialPayload true "query params"
// @Success 200 {object} schemas.TheoryMaterial
// @Router /theoryMaterials [patch]
func (nc *TheoryMaterialController) UpdateTheoryMaterial(ctx *gin.Context) {
	// userUUID := ctx.Value(auth.ContextKeyUserID).(string)
	// response, err := nc.notificationService.GetNotificationSettingList(ctx, userUUID)
	// utils.HandleErrorGin(ctx, err)

	stub := schemas.TheoryMaterial{}
	ctx.JSON(http.StatusOK, stub)
}

// @Summary Delete theory material
// @Description
// @Tags theory-material
// @ID delete-theory-material
// @Accept json
// @Produce json
// @Param theoryMaterialId path string true "theory material id"
// @Success 200
// @Router /theoryMaterials/{theoryMaterialId} [delete]
func (nc *TheoryMaterialController) DeleteTheoryMaterial(ctx *gin.Context) {
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
