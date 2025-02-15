package routers

import (
	"mw-training-bff/internal/controllers"

	"github.com/gin-gonic/gin"
)

type topicRouter struct {
	topicController *controllers.TopicController
}

func newTopicRouter(topicController *controllers.TopicController) *topicRouter {
	return &topicRouter{topicController}
}

func (tr *topicRouter) setTopicRoutes(rg *gin.RouterGroup) {
	topics := rg.Group("/topics")
	topics.POST(":trainingId", tr.topicController.CreateTopic)
	topics.PATCH(":topicId", tr.topicController.UpdateTopic)
	topics.DELETE(":topicId", tr.topicController.DeleteTopic)
}
