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
	cfg       *config.Config
}

func NewServer(cfg *config.Config) *Server {
	server := gin.Default()

	// Apply CORS middleware with custom options
	server.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"*"},
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
		cfg:       cfg,
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
			rooms.GET("/preview", auth.AuthMiddleware(), controller.RoomsController.GetChatPreview)

			rooms.GET("/list/:roomType", auth.AuthMiddleware(), controller.RoomsController.GetRooms)
			rooms.GET("/:roomId", auth.AuthMiddleware(), controller.RoomsController.GetRoomById)
			rooms.POST("", auth.AuthMiddleware(), controller.RoomsController.CreateRoom)
			rooms.PATCH("/:roomId", auth.AuthMiddleware(), controller.RoomsController.UpdateRoom)

			rooms.POST("/:roomId/messages", auth.AuthMiddleware(), controller.RoomsController.CreateMessage)

			rooms.POST("/:roomId/users/:userId", auth.AuthMiddleware(), controller.RoomsController.AddUserToRoom)
			rooms.DELETE("/:roomId/users/:userId", auth.AuthMiddleware(), controller.RoomsController.DeleteUserFromRoom)
		}

		if server.cfg.EnvType != "prod" {
			chat.GET("/dev/reset-db", controller.DevController.ResetDB)
		}
	}
}
