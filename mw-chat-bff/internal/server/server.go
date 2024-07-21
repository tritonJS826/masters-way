package server

import (
	"mw-chat-bff/internal/config"
	"mw-chat-bff/internal/controllers"
	"net/http"

	_ "mw-chat-bff/docs"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	swaggerFiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
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

	server.GET("/healthcheck", func(ctx *gin.Context) {
		ctx.JSON(http.StatusOK, gin.H{"message": "The way APi is working fine"})
	})

	if cfg.EnvType != "prod" {
		server.GET("/docs/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))
	}

	return &Server{
		GinServer: server,
	}
}

// @title     Masters way chat API
// @version 1.0
// @BasePath  /chat
func (server *Server) SetRoutes(controller *controllers.Controller) {
	chat := server.GinServer.Group("/chat")
	{
		p2pRooms := chat.Group("/p2p-rooms")
		{
			p2pRooms.GET("", controller.P2PRoomsController.GetP2PRooms)
			p2pRooms.GET("/:p2pRoomId", controller.P2PRoomsController.GetP2PRoomById)
			p2pRooms.POST("/:p2pRoomId", controller.P2PRoomsController.CreateP2PRoom)
			p2pRooms.PATCH("/:p2pRoomId", controller.P2PRoomsController.UpdateP2PRoom)

			p2pRooms.POST("/:p2pRoomId/messages", controller.P2PRoomsController.CreateMessageInP2PRoom)
		}

		groupRooms := chat.Group("/group-rooms")
		{
			groupRooms.GET("", controller.GroupRoomsController.GetGroupRoomsPreview)
			groupRooms.POST("", controller.GroupRoomsController.CreateGroupRoom)
			groupRooms.GET("/:groupRoomId", controller.GroupRoomsController.GetGroupRoomById)
			groupRooms.PATCH("/:groupRoomId", controller.GroupRoomsController.UpdateGroupRoom)

			groupRooms.POST("/:groupRoomId/users/:userId", controller.GroupRoomsController.AddUserToGroupRoom)
			groupRooms.DELETE("/:groupRoomId/users/:userId", controller.GroupRoomsController.DeleteUserFromGroupRoom)

			groupRooms.GET("/requests", controller.GroupRoomsController.GetRequestsToGroupRoom)
			groupRooms.POST("/requests", controller.GroupRoomsController.CreateRequestsToGroupRoom)

			groupRooms.POST("/:groupRoomId/requests/accept", controller.GroupRoomsController.AcceptRequestsToGroupRoom)
			groupRooms.DELETE("/:groupRoomId/requests/decline", controller.GroupRoomsController.DeclineRequestsToGroupRoom)

			groupRooms.POST("/:groupRoomId/messages", controller.GroupRoomsController.CreateMessageInGroupRoom)
		}
	}
}
