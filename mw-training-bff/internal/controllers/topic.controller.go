package controllers

import (
	"mw-training-bff/internal/schemas"
	"mw-training-bff/internal/services"
	"net/http"

	"github.com/gin-gonic/gin"
)

type TopicController struct {
	generalService *services.GeneralService
	topicService   *services.TopicService
}

func NewTopicController(generalService *services.GeneralService, topicService *services.TopicService) *TopicController {
	return &TopicController{generalService, topicService}
}

// @Summary Create topic
// @Description
// @Tags topic
// @ID create-topic
// @Accept json
// @Produce json
// @Param trainingId path string true "training id"
// @Success 200 {object} schemas.Topic
// @Router /topics/{trainingId} [post]
func (nc *TopicController) CreateTopic(ctx *gin.Context) {
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

	stub := schemas.Topic{}

	ctx.JSON(http.StatusOK, stub)
}

// @Summary Update topic
// @Description
// @Tags topic
// @ID update-topic
// @Accept json
// @Produce json
// @Param request body schemas.UpdateTopicPayload true "query params"
// @Param topicId path string true "topic id"
// @Success 200 {object} schemas.Topic
// @Router /topics/{topicId} [patch]
func (nc *TopicController) UpdateTopic(ctx *gin.Context) {
	// var payload *schemas.UpdateNotificationPayload
	// notificationUUID := ctx.Param("notificationId")

	// if err := ctx.ShouldBindJSON(&payload); err != nil {
	// 	ctx.JSON(http.StatusBadRequest, gin.H{"status": "Failed payload", "error": err.Error()})
	// 	return
	// }

	// response, err := nc.notificationService.UpdateNotification(ctx, notificationUUID, payload.IsRead)
	// utils.HandleErrorGin(ctx, err)

	stub := schemas.Topic{}

	ctx.JSON(http.StatusOK, stub)
}

// @Summary Delete topic by Uuid
// @Description
// @Tags topic
// @ID delete-topic
// @Accept json
// @Produce json
// @Param topicId path string true "topic id"
// @Success 200
// @Router /topics/{topicId} [delete]
func (nc *TopicController) DeleteTopic(ctx *gin.Context) {
	// userUUID := ctx.Value(auth.ContextKeyUserID).(string)
	// response, err := nc.notificationService.GetNotificationSettingList(ctx, userUUID)
	// utils.HandleErrorGin(ctx, err)

	ctx.Status(http.StatusOK)
}
