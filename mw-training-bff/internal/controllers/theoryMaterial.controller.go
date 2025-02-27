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
// @Router /theoryMaterials/{theoryMaterialId} [patch]
func (tmc *TheoryMaterialController) UpdateTheoryMaterial(ctx *gin.Context) {
	var payload *schemas.UpdateTheoryMaterialPayload
	theoryMaterialId := ctx.Param("theoryMaterialId")

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "Failed payload", "error": err.Error()})
		return
	}

	args := &services.UpdateTheoryMaterialParams{
		TheoryMaterialId: theoryMaterialId,
		Name:             payload.Name,
		Description:      payload.Description,
	}

	response, err := tmc.theoryMaterialService.UpdateTheoryMaterial(ctx, args)
	util.HandleErrorGin(ctx, err)

	ctx.JSON(http.StatusOK, response)
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
func (tmc *TheoryMaterialController) DeleteTheoryMaterial(ctx *gin.Context) {
	theoryMaterialId := ctx.Param("theoryMaterialId")

	err := tmc.theoryMaterialService.DeleteTheoryMaterial(ctx, theoryMaterialId)
	util.HandleErrorGin(ctx, err)

	ctx.Status(http.StatusOK)
}
