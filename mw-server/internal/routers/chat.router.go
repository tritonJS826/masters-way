package routers

import (
	"mw-server/internal/config"
	"mw-server/internal/controllers"
	"mw-server/internal/auth"

	"github.com/gin-gonic/gin"
)

type chatRouter struct {
	roomController    *controllers.RoomController
	messageController *controllers.MessageController
	config            *config.Config
}

func newChatRouter(roomController *controllers.RoomController, messageController *controllers.MessageController, config *config.Config) *chatRouter {
	return &chatRouter{roomController, messageController, config}
}

func (cr *chatRouter) setChatRoutes(rg *gin.RouterGroup) {
	router := rg.Group("/chat", auth.AuthMiddleware(cr.config))
	router.GET("/rooms/preview", cr.roomController.GetChatPreview)
	router.POST("/rooms", cr.roomController.FindOrCreateRoom)
	router.GET("/rooms/list/:roomType", cr.roomController.GetRooms)
	router.GET("/rooms/:roomId", cr.roomController.GetRoomById)
	router.PATCH("/rooms/:roomId", cr.roomController.UpdateRoom)
	router.POST("/rooms/:roomId/users/:userId", cr.roomController.AddUserToRoom)
	router.DELETE("/rooms/:roomId/users/:userId", cr.roomController.DeleteUserFromRoom)
	router.POST("/messages", cr.messageController.CreateMessage)
	router.POST("/messages/greeting", cr.messageController.CreateGreetingMessage)
	router.PATCH("/messages/:messageId/message-status", cr.messageController.UpdateMessageStatus)
}