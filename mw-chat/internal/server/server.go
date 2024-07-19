package server

import (
	"mwchat/internal/config"

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
			groupRooms.GET("")
			groupRooms.GET("/:groupRoomId")
			groupRooms.POST("/:groupRoomId")
			groupRooms.PATCH("/:groupRoomId")

			users := groupRooms.Group("/:groupRoomId/users")
			{
				users.POST("/:userId")
				users.DELETE("/:userId")
			}

			requests := groupRooms.Group("/requests")
			{
				requests.GET("")
				requests.POST("/:requestId")
			}

			groupRooms.POST("/:groupRoomId/messages")
		}
	}
}
