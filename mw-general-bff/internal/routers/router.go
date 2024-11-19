package routers

import (
	"fmt"
	"mw-general-bff/internal/auth"
	"mw-general-bff/internal/config"
	"mw-general-bff/internal/controllers"
	"net/http"

	_ "mw-general-bff/docs"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	swaggerFiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
)

type Router struct {
	Gin                            *gin.Engine
	config                         *config.Config
	fileRouter                     *fileRouter
	authRouter                     *authRouter
	commentRouter                  *commentRouter
	compositeWayRouter             *compositeWayRouter
	dayReportRouter                *dayReportRouter
	wayTagRouter                   *wayTagRouter
	favoriteUserRouter             *favoriteUserRouter
	favoriteUserWayRouter          *favoriteUserWayRouter
	fromUserMentoringRequestRouter *fromUserMentoringRequestRouter
	geminiRouter                   *geminiRouter
	jobDoneRouter                  *jobDoneRouter
	jobDoneJobTagRouter            *jobDoneJobTagRouter
	jobTagRouter                   *jobTagRouter
	mentorUserWayRouter            *mentorUserWayRouter
	metricRouter                   *metricRouter
	planRouter                     *planRouter
	planJobTagRouter               *planJobTagRouter
	problemRouter                  *problemRouter
	projectRouter                  *projectRouter
	wayRouter                      *wayRouter
	toUserMentoringRequestRouter   *toUserMentoringRequestRouter
	userRouter                     *userRouter
	userTagRouter                  *userTagRouter
	userProjectRouter              *userProjectRouter
	wayCollectionRouter            *wayCollectionRouter
	wayCollectionWayRouter         *wayCollectionWayRouter
	healthCheckRouter              *healthCheckRouter
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
		Gin:                            ginRouter,
		config:                         config,
		fileRouter:                     newFileRouter(controller.FileController),
		authRouter:                     newAuthRouter(controller.AuthController, config),
		commentRouter:                  newCommentRouter(controller.CommentController, config),
		compositeWayRouter:             newCompositeWayRouter(controller.CompositeWayController, config),
		dayReportRouter:                newDayReportRouter(controller.DayReportController, config),
		favoriteUserRouter:             newFavoriteUserRouter(controller.FavoriteUserController, config),
		favoriteUserWayRouter:          newFavoriteUserWayRouter(controller.FavoriteUserWayController, config),
		fromUserMentoringRequestRouter: newFromUserMentoringRequestRouter(controller.FromUserMentoringRequestController, config),
		geminiRouter:                   newGeminiRouter(controller.GeminiController),
		jobDoneRouter:                  newJobDoneRouter(controller.JobDoneController, config),
		jobDoneJobTagRouter:            newJobDoneJobTagRouter(controller.JobDoneJobTagController, config),
		jobTagRouter:                   newJobTagRouter(controller.JobTagController, config),
		mentorUserWayRouter:            newMentorUserWayRouter(controller.MentorUserWayController, config),
		metricRouter:                   newMetricRouter(controller.MetricController, config),
		planRouter:                     newPlanRouter(controller.PlanController, config),
		planJobTagRouter:               newPlanJobTagRouter(controller.PlanJobTagController, config),
		problemRouter:                  newProblemRouter(controller.ProblemController, config),
		projectRouter:                  newProjectRouter(controller.ProjectController, config),
		wayRouter:                      newWayRouter(controller.WayController, config),
		wayTagRouter:                   newWayTagRouter(controller.WayTagController, config),
		toUserMentoringRequestRouter:   newToUserMentoringRequestRouter(controller.ToUserMentoringRequestController, config),
		userRouter:                     newUserRouter(controller.UserController, config),
		userTagRouter:                  newUserTagRouter(controller.UserTagController, config),
		userProjectRouter:              newUserProjectRouter(controller.UserProjectController, config),
		wayCollectionRouter:            newWayCollectionRouter(controller.WayCollectionController, config),
		wayCollectionWayRouter:         newWayCollectionWayRouter(controller.WayCollectionWayController, config),
		healthCheckRouter:              newHealthCheckRouter(controller.HealthCheckController),
	}
}

func (r *Router) SetRoutes(cfg *config.Config) {
	general := r.Gin.Group("/general")
	file := r.Gin.Group("/storage", auth.HandleHeaders(cfg))

	r.fileRouter.setFileRoutes(file)

	r.authRouter.setAuthRoutes(general)
	r.commentRouter.setCommentRoutes(general)
	r.compositeWayRouter.setCompositeWayRoutes(general)
	r.dayReportRouter.setDayReportRoutes(general)
	r.favoriteUserRouter.setFavoriteUserRoutes(general)
	r.favoriteUserWayRouter.setFavoriteUserWayRoutes(general)
	r.fromUserMentoringRequestRouter.setFromUserMentoringRequestRoutes(general)
	r.geminiRouter.setGeminiRoutes(general)
	r.jobDoneRouter.setJobDoneRoutes(general)
	r.jobDoneJobTagRouter.setJobDoneJobTagRoutes(general)
	r.jobTagRouter.setJobTagRoutes(general)
	r.mentorUserWayRouter.setMentorUserWayRoutes(general)
	r.metricRouter.setMetricRouter(general)
	r.planRouter.setPlanRoutes(general)
	r.planJobTagRouter.setPlanJobTagRoutes(general)
	r.problemRouter.setProblemRoutes(general)
	r.projectRouter.setProjectRouter(general)
	r.wayRouter.setWayRoutes(general)
	r.toUserMentoringRequestRouter.setToUserMentoringRequestRoutes(general)
	r.userRouter.setUserRoutes(general)
	r.userTagRouter.setUserTagRoutes(general)
	r.userProjectRouter.setUserProjectRoutes(general)
	r.wayCollectionRouter.setWayCollectionRoutes(general)
	r.wayCollectionWayRouter.setWayCollectionWayRoutes(general)
	r.wayTagRouter.setWayTagRoutes(general)
	r.healthCheckRouter.setHealthCheckRoutes(general)

	if r.config.EnvType != "prod" {
		r.Gin.GET("/docs/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))
	}
}
