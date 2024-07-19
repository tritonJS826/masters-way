package server

import (
	"mwchat/internal/config"
	"mwchat/internal/controllers"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

type Server struct {
	GinServer *gin.Engine
}

func NewServer(cfg *config.Config) *Server {
	server := gin.Default()

	// Apply CORS middleware with custom options
	server.Use(cors.New(cors.Config{
		// AllowOrigins: []string{"*"},
		AllowOrigins:     []string{cfg.WebappBaseUrl},
		AllowMethods:     []string{"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Accept", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
	}))

	// if cfg.EnvType != "prod" {
	// 	server.GET("/docs/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))
	// }

	return &Server{
		GinServer: server,
	}
}

func (server *Server) SetRoutes() {
	chat := server.GinServer.Group("/chat")
	{
		p2pRooms := chat.Group("/p2p-rooms")
		{
			p2pRooms.GET("")
			p2pRooms.GET("/:p2pRoomId")
			p2pRooms.POST("/:p2pRoomId")
			p2pRooms.PATCH("/:p2pRoomId")

			p2pRooms.POST("/:p2pRoomId/messages")
		}

		groupRooms := chat.Group("/group-rooms")
		{
			groupRooms.GET("", controllers.NewGroupRoomsController().GetGroupRoomsPreview)
			groupRooms.POST("", controllers.NewGroupRoomsController().CreateGroupRoom)
			groupRooms.GET("/:groupRoomId", controllers.NewGroupRoomsController().GetGroupRoomById)
			groupRooms.PATCH("/:groupRoomId", controllers.NewGroupRoomsController().UpdateGroupRoom)

			groupRooms.POST("/:groupRoomId/users/:userId", controllers.NewGroupRoomsController().AddUserToGroupRoom)
			groupRooms.DELETE("/:groupRoomId/users/:userId", controllers.NewGroupRoomsController().DeleteUserFromGroupRoom)

			groupRooms.GET("/requests", controllers.NewGroupRoomsController().GetRequestsToGroupRoom)
			groupRooms.POST("/requests", controllers.NewGroupRoomsController().MakeRequestsToGroupRoom)
			groupRooms.POST("/requests/accept/:groupRoomId", controllers.NewGroupRoomsController().AcceptRequestsToGroupRoom)
			groupRooms.DELETE("/requests/decline/:groupRoomId", controllers.NewGroupRoomsController().DeclineRequestsToGroupRoom)

			groupRooms.POST("/:groupRoomId/messages", controllers.NewGroupRoomsController().MakeMessageInGroupRoom)
		}
	}
}
