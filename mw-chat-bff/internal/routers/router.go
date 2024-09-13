package routers

import (
	"fmt"
	"mw-chat-bff/internal/auth"
	"mw-chat-bff/internal/config"
	"mw-chat-bff/internal/controllers"
	"net/http"

	_ "mw-chat-bff/docs"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	swaggerFiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
)

type Router struct {
	Gin           *gin.Engine
	config        *config.Config
	fileRouter    *fileRouter
	roomRouter    *roomRouter
	messageRouter *messageRouter
}

func NewRouter(config *config.Config, controller *controllers.Controller) *Router {
	ginRouter := gin.Default()

	// Apply CORS middleware with custom options
	ginRouter.Use(cors.New(cors.Config{
		AllowOrigins:     []string{config.WebappBaseURL},
		AllowMethods:     []string{"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Accept", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
	}))

	ginRouter.NoRoute(func(ctx *gin.Context) {
		ctx.JSON(http.StatusNotFound, gin.H{"status": "failed", "message": fmt.Sprintf("The specified route %s not found", ctx.Request.URL)})
	})

	return &Router{
		Gin:           ginRouter,
		config:        config,
		fileRouter:    newFileRouter(controller.FileController),
		roomRouter:    newRoomRouter(controller.RoomsController),
		messageRouter: newMessageRouter(controller.MessagesController),
	}
}

func (r *Router) SetRoutes() {
	chat := r.Gin.Group("/chat", auth.HandleHeaders())

	r.fileRouter.setFileRoutes(chat)
	r.roomRouter.setRoomRoutes(chat)
	r.messageRouter.setMessageRoutes(chat)

	if r.config.EnvType != "prod" {
		r.Gin.GET("/docs/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))
	}
}
