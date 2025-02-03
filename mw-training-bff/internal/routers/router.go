package routers

import (
	"fmt"
	"mw-training-bff/internal/config"
	"mw-training-bff/internal/controllers"
	"net/http"

	_ "mw-training-bff/docs"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	swaggerFiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
)

type Router struct {
	Gin                        *gin.Engine
	config                     *config.Config
	trainingTrainingTagRouter  *trainingTrainingTagRouter
	trainingStudentRouter      *trainingStudentRouter
	trainingMentorRouter       *trainingMentorRouter
	trainingRouter             *trainingRouter
	topicRouter                *topicRouter
	theoryMaterialRouter       *theoryMaterialRouter
	practiceMaterialRouter     *practiceMaterialRouter
	favoriteUserTrainingRouter *favoriteUserTrainingRouter
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
		ctx.JSON(http.StatusNotFound, gin.H{"status": "failed", "error": fmt.Sprintf("The specified route %s not found", ctx.Request.URL)})
	})

	return &Router{
		Gin:                        ginRouter,
		config:                     config,
		trainingTrainingTagRouter:  newTrainingTrainingTagRouter(controller.TrainingTrainingTagController),
		trainingStudentRouter:      newTrainingStudentRouter(controller.TrainingStudentController),
		trainingMentorRouter:       newTrainingMentorRouter(controller.TrainingMentorController),
		trainingRouter:             newTrainingRouter(controller.TrainingController),
		topicRouter:                newTopicRouter(controller.TopicController),
		theoryMaterialRouter:       newTheoryMaterialRouter(controller.TheoryMaterialController),
		practiceMaterialRouter:     newPracticeMaterialRouter(controller.PracticeMaterialController),
		favoriteUserTrainingRouter: newFavoriteUserTrainingRouter(controller.FavoriteUserTrainingController, config),
	}
}

func (r *Router) SetRoutes() {
	training := r.Gin.Group("/training" /*auth.HandleHeaders()*/)

	r.trainingTrainingTagRouter.setTrainingTrainingTagRoutes(training)
	r.trainingStudentRouter.setTrainingStudentRoutes(training)
	r.trainingMentorRouter.setTrainingMentorRoutes(training)
	r.trainingRouter.setTrainingRoutes(training)
	r.topicRouter.setTopicRoutes(training)
	r.theoryMaterialRouter.setTheoryMaterialRoutes(training)
	r.practiceMaterialRouter.setPracticeMaterialRoutes(training)
	r.favoriteUserTrainingRouter.setFavoriteUserTrainingRoutes(training)

	if r.config.EnvType != "prod" {
		r.Gin.GET("/docs/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))
	}
}
