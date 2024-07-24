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

		rooms := chat.Group("/rooms")
		{
			rooms.GET("/preview", controller.RoomsController.GetChatPreview)

			rooms.GET("/list/:roomType", controller.RoomsController.GetRooms)
			rooms.GET("/:roomId", controller.RoomsController.GetRoomById)
			rooms.POST("/:roomType", controller.RoomsController.CreateRoom)
			rooms.PATCH("/:roomId", controller.RoomsController.UpdateRoom)

			rooms.POST("create-message/:roomId/messages", controller.RoomsController.CreateMessage)

			rooms.POST("add-user/:roomId/users/:userId", controller.RoomsController.AddUserToRoom)

			rooms.DELETE("/:roomId/users/:userId", controller.RoomsController.DeleteUserFromRoom)
		}

	}
}
