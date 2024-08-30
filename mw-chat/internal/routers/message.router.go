package routers

import (
	"mwchat/internal/auth"
	"mwchat/internal/controllers"

	"github.com/gin-gonic/gin"
)

type messageRouter struct {
	messageController *controllers.MessageController
}

func newMessageController(messageController *controllers.MessageController) *messageRouter {
	return &messageRouter{messageController}
}

func (mr *messageRouter) setMessageRoutes(rg *gin.RouterGroup) {
	messages := rg.Group("/messages", auth.AuthMiddleware())
	messages.POST("", mr.messageController.CreateMessage)
	messages.PATCH("/:messageId/message-status", mr.messageController.UpdateMessageStatus)
}
