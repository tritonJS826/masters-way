package routers

import (
	"fmt"
	"mwnotification/internal/config"
	"mwnotification/internal/controllers"
	"net/http"

	_ "mwnotification/docs"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	swaggerFiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
)

type Router struct {
	Gin                       *gin.Engine
	config                    *config.Config
	notificationRouter        *notificationRouter
	enabledNotificationRouter *enabledNotificationRouter
	devRouter                 *devRouter
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
		Gin:                       ginRouter,
		config:                    config,
		notificationRouter:        newNotificationRouter(controller.NotificationController),
		enabledNotificationRouter: newEnabledNotificationRouter(controller.EnabledNotificationController),
		devRouter:                 newDevRouter(controller.DevController),
	}
}

func (r *Router) SetRoutes() {
	notification := r.Gin.Group("/notification")

	r.notificationRouter.setNotificationRoutes(notification)
	r.enabledNotificationRouter.setEnabledNotificationRoutes(notification)

	if r.config.EnvType != "prod" {
		r.devRouter.setDevRoutes(notification)
		r.Gin.GET("/docs/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))
	}
}
