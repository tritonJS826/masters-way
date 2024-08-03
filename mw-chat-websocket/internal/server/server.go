package server

import (
	"mw-chat-websocket/internal/config"
	"mw-chat-websocket/internal/controllers"
	"net/http"

	// _ "mwchat/docs"

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

	server.GET("/healthcheck", func(ctx *gin.Context) {
		ctx.JSON(http.StatusOK, gin.H{"message": "The way APi is working fine"})
	})

	// if cfg.EnvType != "prod" {
	// 	server.GET("/docs/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))
	// }

	return &Server{
		GinServer: server,
	}
}

// @title     Masters way chat API
// @version 1.0
// @BasePath  /chat-websocket
func (server *Server) SetRoutes(controller *controllers.Controller) {
	server.GinServer.GET("/ws", controller.SocketController.ConnectSocket)
	server.GinServer.GET("/send-message", controller.SocketController.SendMessage)
}
