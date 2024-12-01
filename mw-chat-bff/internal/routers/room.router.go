package routers

import (
	"mw-chat-bff/internal/controllers"

	"github.com/gin-gonic/gin"
)

type roomRouter struct {
	roomsController *controllers.RoomController
}

func newRoomRouter(roomController *controllers.RoomController) *roomRouter {
	return &roomRouter{roomController}
}

func (rr *roomRouter) setRoomRoutes(rg *gin.RouterGroup) {
	rooms := rg.Group("/rooms")
	rooms.GET("/preview", rr.roomsController.GetChatPreview)
	rooms.GET("/list/:roomType", rr.roomsController.GetRooms)
	rooms.GET("/:roomId", rr.roomsController.GetRoomById)
	rooms.POST("", rr.roomsController.FindOrCreateRoom)
	rooms.PATCH("/:roomId", rr.roomsController.UpdateRoom)
	rooms.POST("/:roomId/users/:userId", rr.roomsController.AddUserToRoom)
	rooms.DELETE("/:roomId/users/:userId", rr.roomsController.DeleteUserFromRoom)
}
