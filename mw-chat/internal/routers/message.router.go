package routers

import (
	"mw-chat/internal/auth"
	"mw-chat/internal/controllers"

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
	messages.POST("", auth.AuthMiddleware(), mr.messageController.CreateMessage)
	messages.POST("/greeting", mr.messageController.CreateGreetingMessage)
	messages.PATCH("/:messageId/message-status", auth.AuthMiddleware(), mr.messageController.UpdateMessageStatus)
}
