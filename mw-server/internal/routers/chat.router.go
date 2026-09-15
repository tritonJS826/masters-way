package routers

import (
	"mw-server/internal/controllers"

	"github.com/gin-gonic/gin"
)

type chatRouter struct {
	roomController    *controllers.RoomController
	messageController *controllers.MessageController
}

func newChatRouter(roomController *controllers.RoomController, messageController *controllers.MessageController) *chatRouter {
	return &chatRouter{roomController, messageController}
}

func (cr *chatRouter) setChatRoutes(rg *gin.RouterGroup, authMiddleware gin.HandlerFunc) {
	router := rg.Group("", authMiddleware)
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