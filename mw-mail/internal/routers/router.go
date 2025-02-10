package routers

import (
	"fmt"
	"mwmail/internal/config"
	"mwmail/internal/controllers"
	"net/http"

	_ "mwmail/docs"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	swaggerFiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
)

type Router struct {
	Gin        *gin.Engine
	config     *config.Config
	mailRouter *mailRouter
	devRouter  *devRouter
}

func NewRouter(config *config.Config, controller *controllers.Controller) *Router {
	ginRouter := gin.Default()

	// Apply CORS middleware with custom options
	ginRouter.Use(cors.New(cors.Config{
		AllowOrigins:     []string{config.ChatBFFBaseURL, config.GeneralBFFBaseURL, config.NotificationBFFBaseURL},
		AllowMethods:     []string{"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Accept", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
	}))

	ginRouter.NoRoute(func(ctx *gin.Context) {
		ctx.JSON(http.StatusNotFound, gin.H{"status": "failed", "error": fmt.Sprintf("The specified route %s not found", ctx.Request.URL)})
	})

	return &Router{
		Gin:        ginRouter,
		config:     config,
		mailRouter: newMailRouter(controller.MailController),
		devRouter:  newDevRouter(controller.DevController),
	}
}

func (r *Router) SetRoutes() {
	mail := r.Gin.Group("/mw-mail")

	r.mailRouter.setMailRoutes(mail)

	if r.config.EnvType != "prod" {
		r.devRouter.setDevRoutes(mail)
		r.Gin.GET("/docs/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))
	}
}
