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
// @Router /topics/{topicId} [get]
func (tc *TopicController) GetTopicById(ctx *gin.Context) {
	topicId := ctx.Param("topicId")

	topic, err := tc.topicService.GetTopicById(ctx, topicId)
	util.HandleErrorGin(ctx, err)

	ctx.JSON(http.StatusOK, topic)

}

// @Summary Create topics (bunch create)
// @Description
// @Tags topic
// @ID create-topics
// @Accept json
// @Produce json
// @Param trainingId path string true "training id"
// @Param topicsParentId query string false "Topics parent id"
// @Param request body schemas.CreateTopicsPayload true "query params"
// @Success 200 {object} schemas.TopicsPreview
// @Router /topics/{trainingId} [post]
func (tc *TopicController) CreateTopics(ctx *gin.Context) {
	var payload *schemas.CreateTopicsPayload
	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "Failed payload", "error": err.Error()})
		return
	}

	topicParentIdRaw := ctx.DefaultQuery("topicParentId", "")
	trainingId := ctx.Param("trainingId")

	var topicParentId *string
	if topicParentIdRaw == "" {
		topicParentId = nil
	} else {
		topicParentId = &topicParentIdRaw
	}

	var topicNames []string
	for _, topic := range payload.TopicsPayload {
		var topicName string
		if topic.TopicName != nil {
			topicName = *topic.TopicName
		} else {
			topicName = ""
		}
		topicNames = append(topicNames, topicName)
	}

	args := &services.CreateTopicsParams{
		TrainingUuid:    trainingId,
		ParentTopicUuid: topicParentId,
		Names:           topicNames,
	}

	topics, err := tc.topicService.CreateTopics(ctx, args)
	util.HandleErrorGin(ctx, err)

	ctx.JSON(http.StatusOK, topics)
}

// @Summary Update topic
// @Description
// @Tags topic
// @ID update-topic
// @Accept json
// @Produce json
// @Param request body schemas.UpdateTopicPayload true "query params"
// @Param topicId path string true "topic id"
// @Success 200 {object} schemas.TopicPreview
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
