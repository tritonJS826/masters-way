package server

import (
	"mwchat/internal/auth"
	"mwchat/internal/config"
	"mwchat/internal/controllers"
	"net/http"

	_ "mwchat/docs"

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
			p2pRooms.GET("", auth.AuthMiddleware(), controller.P2PRoomsController.HandleGetP2PRooms)                // +
			p2pRooms.GET("/:p2pRoomId", auth.AuthMiddleware(), controller.P2PRoomsController.HandleGetP2PRoomById)  // +
			p2pRooms.POST("/:p2pRoomId", auth.AuthMiddleware(), controller.P2PRoomsController.HandleCreateP2PRoom)  // +
			p2pRooms.PATCH("/:p2pRoomId", auth.AuthMiddleware(), controller.P2PRoomsController.HandleUpdateP2PRoom) // +

			p2pRooms.POST("/:p2pRoomId/messages", auth.AuthMiddleware(), controller.P2PRoomsController.HandleCreateMessageInP2PRoom) // +
		}

		groupRooms := chat.Group("/group-rooms")
		{
			groupRooms.GET("", controller.GroupRoomsController.HandleGetGroupRoomsPreview)
			groupRooms.POST("", controller.GroupRoomsController.HandleCreateGroupRoom)
			groupRooms.GET("/:groupRoomId", controller.GroupRoomsController.HandleGetGroupRoomById)
			groupRooms.PATCH("/:groupRoomId", controller.GroupRoomsController.HandleUpdateGroupRoom)

			groupRooms.POST("/:groupRoomId/users/:userId", controller.GroupRoomsController.HandleAddUserToGroupRoom)
			groupRooms.DELETE("/:groupRoomId/users/:userId", controller.GroupRoomsController.HandleDeleteUserFromGroupRoom)

			groupRooms.GET("/requests", controller.GroupRoomsController.HandleGetRequestsToGroupRoom)
			groupRooms.POST("/requests", controller.GroupRoomsController.HandleCreateRequestsToGroupRoom)

			groupRooms.POST("/:groupRoomId/requests/accept", controller.GroupRoomsController.HandleAcceptRequestsToGroupRoom)
			groupRooms.DELETE("/:groupRoomId/requests/decline", controller.GroupRoomsController.HandleDeclineRequestsToGroupRoom)

			groupRooms.POST("/:groupRoomId/messages", controller.GroupRoomsController.HandleCreateMessageInGroupRoom)
		}
	}
}
