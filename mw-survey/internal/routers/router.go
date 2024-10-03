package routers

import (
	"fmt"
	"mwsurvey/internal/config"
	"mwsurvey/internal/controllers"
	"net/http"

	_ "mwsurvey/docs"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	swaggerFiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
)

type Router struct {
	Gin        *gin.Engine
	config     *config.Config
	fileRouter *surveyRouter
	devRouter  *devRouter
}

func NewRouter(config *config.Config, controller *controllers.Controller) *Router {
	ginRouter := gin.Default()

	// Apply CORS middleware with custom options
	ginRouter.Use(cors.New(cors.Config{
		AllowOrigins:     []string{config.WebappBaseUrl},
		AllowMethods:     []string{"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Accept", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
	}))

	ginRouter.NoRoute(func(ctx *gin.Context) {
		ctx.JSON(http.StatusNotFound, gin.H{"status": "failed", "message": fmt.Sprintf("The specified route %s not found", ctx.Request.URL)})
	})

	return &Router{
		Gin:        ginRouter,
		config:     config,
		fileRouter: newSurveyRouter(controller.SurveyController),
		devRouter:  newDevRouter(controller.DevController),
	}
}

func (r *Router) SetRoutes() {
	survey := r.Gin.Group("/survey")

	r.fileRouter.setSurveyRoutes(survey)

	if r.config.EnvType != "prod" {
		r.devRouter.setDevRoutes(survey)
		r.Gin.GET("/docs/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))
	}
}
