package routers

import (
	"mw-training-bff/internal/controllers"

	"github.com/gin-gonic/gin"
)

type messageRouter struct {
	messageController *controllers.MessageController
}

func newMessageRouter(messageController *controllers.MessageController) *messageRouter {
	return &messageRouter{messageController}
}

func (mr *messageRouter) setMessageRoutes(rg *gin.RouterGroup) {
	messages := rg.Group("/messages")
	messages.POST("", mr.messageController.CreateMessage)
	messages.PATCH("/:messageId/message-status", mr.messageController.UpdateMessageStatus)
}
