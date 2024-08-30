package routers

import (
	"mwchat/internal/auth"
	"mwchat/internal/controllers"

	"github.com/gin-gonic/gin"
)

type roomRouter struct {
	roomsController *controllers.RoomController
}

func newRoomController(roomController *controllers.RoomController) *roomRouter {
	return &roomRouter{roomController}
}

func (rr *roomRouter) setRoomRoutes(rg *gin.RouterGroup) {
	rooms := rg.Group("/rooms", auth.AuthMiddleware())
	rooms.GET("/preview", rr.roomsController.GetChatPreview)
	rooms.POST("", rr.roomsController.CreateRoom)
	rooms.GET("/list/:roomType", rr.roomsController.GetRooms)
	rooms.GET("/:roomId", rr.roomsController.GetRoomById)
	rooms.PATCH("/:roomId", rr.roomsController.UpdateRoom)
	rooms.POST("/:roomId/users/:userId", rr.roomsController.AddUserToRoom)
	rooms.DELETE("/:roomId/users/:userId", rr.roomsController.DeleteUserFromRoom)
}
