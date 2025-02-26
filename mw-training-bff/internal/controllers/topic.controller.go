package controllers

import (
	"mw-training-bff/internal/schemas"
	"mw-training-bff/internal/services"
	util "mw-training-bff/internal/utils"
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

// @Summary Get topic by id
// @Description
// @Tags topic
// @ID get-topic
// @Accept json
// @Produce json
// @Param topicId path string true "topic id"
// @Success 200 {object} schemas.Topic
// @Router /topics/{topicId} [post]
func (tc *TopicController) GetTopicById(ctx *gin.Context) {
	topicId := ctx.Param("topicId")

	topic, err := tc.topicService.GetTopicById(ctx, topicId)
	util.HandleErrorGin(ctx, err)

	ctx.JSON(http.StatusOK, topic)

}

// @Summary Create topic
// @Description
// @Tags topic
// @ID create-topic
// @Accept json
// @Produce json
// @Param trainingId path string true "training id"
// @Param topicParentId query string false "Topic parent id"
// @Success 200 {object} schemas.Topic
// @Router /topics/{trainingId} [post]
func (tc *TopicController) CreateTopic(ctx *gin.Context) {
	topicParentIdRaw := ctx.DefaultQuery("topicParentId", "")
	trainingId := ctx.Param("trainingId")

	var topicParentId *string
	if topicParentIdRaw != "" {
		topicParentId = nil
	}

	args := &services.CreateTopicParams{
		TrainingUuid:    trainingId,
		ParentTopicUuid: topicParentId,
	}

	topic, err := tc.topicService.CreateTopic(ctx, args)
	util.HandleErrorGin(ctx, err)

	ctx.JSON(http.StatusOK, topic)
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
func (tc *TopicController) UpdateTopic(ctx *gin.Context) {
	// userUUID := ctx.Value(auth.ContextKeyUserID).(string)
	var payload *schemas.UpdateTopicPayload
	topicId := ctx.Param("topicId")

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "Failed payload", "error": err.Error()})
		return
	}

	args := &services.UpdateTopicParams{
		TopicUuid: topicId,
		Name:      payload.Name,
	}
	topic, err := tc.topicService.UpdateTopic(ctx, args)
	util.HandleErrorGin(ctx, err)

	ctx.JSON(http.StatusOK, topic)
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
func (tc *TopicController) DeleteTopic(ctx *gin.Context) {
	// userUUID := ctx.Value(auth.ContextKeyUserID).(string)
	topicId := ctx.Param("topicId")

	args := &services.DeleteTopicParams{
		TopicUuid: topicId,
	}
	err := tc.topicService.DeleteTopic(ctx, args)
	util.HandleErrorGin(ctx, err)

	ctx.Status(http.StatusOK)
}
