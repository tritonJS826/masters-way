package server

import (
	"mw-chat-websocket/internal/auth"
	"mw-chat-websocket/internal/config"
	"mw-chat-websocket/internal/controllers"
	"net/http"

	_ "mw-chat-websocket/docs"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	swaggerFiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
)

type Server struct {
	GinServer *gin.Engine
	Config    *config.Config
}

func NewServer(cfg *config.Config) *Server {
	server := gin.Default()

	// Apply CORS middleware with custom options
	server.Use(cors.New(cors.Config{
		// AllowOrigins: []string{"*"},
		AllowOrigins:     []string{cfg.WebappBaseUrl, cfg.NotificationBffDomain},
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
		Config:    cfg,
	}
}

func (server *Server) SetRoutes(controller *controllers.Controller) {
	mwNotificationWebsocket := server.GinServer.Group("/mw-notification-websocket")
	{
		mwNotificationWebsocket.GET("/ws", auth.ExtractTokenMiddleware(server.Config), controller.SocketController.ConnectSocket)

		mwNotificationWebsocket.POST("/notification", controller.SocketController.SendNotificationReceivedEvent)
	}
}
