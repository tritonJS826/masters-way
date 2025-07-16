package server

import (
	"mw-test-websocket/internal/auth"
	"mw-test-websocket/internal/config"
	"mw-test-websocket/internal/controllers"
	"net/http"

	_ "mw-test-websocket/docs"

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
		AllowOrigins:     []string{cfg.WebappBaseUrl, cfg.TrainingBffDomain},
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
	mwChatWebsocket := server.GinServer.Group("/mw-test-websocket")
	{
		mwChatWebsocket.GET("/ws", auth.ExtractTokenMiddleware(server.Config), controller.SocketController.ConnectSocket)

		mwChatWebsocket.POST("session/:sessionUuid/userJoinedSession", controller.SocketController.SendUserJoinedSessionEvent)
		mwChatWebsocket.POST("session/:sessionUuid/userReadyToStartPlay", controller.SocketController.SendUserReadyToStartPlayEvent)
		mwChatWebsocket.POST("session/:sessionUuid/hostStartedGame", controller.SocketController.SendHostStartedGameEvent)
		mwChatWebsocket.POST("session/:sessionUuid/userCapturedTarget", controller.SocketController.SendUserCapturedTargetEvent)
		mwChatWebsocket.POST("session/:sessionUuid/userAnsweredQuestion", controller.SocketController.SendUserAnsweredQuestionEvent)
		mwChatWebsocket.POST("session/:sessionUuid/userAnswerHandledByServer", controller.SocketController.SendUserAnswerHandledByServerEvent)
	}
}
