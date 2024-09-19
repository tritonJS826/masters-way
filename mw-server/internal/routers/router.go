package routers

import (
	"fmt"
	"mwserver/internal/config"
	"mwserver/internal/controllers"
	"net/http"

	_ "mwserver/docs"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	swaggerFiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
)

type Router struct {
	Gin                            *gin.Engine
	config                         *config.Config
	authRouter                     *authRouter
	commentRouter                  *commentRouter
	compositeWayRouter             *compositeWayRouter
	dayReportRouter                *dayReportRouter
	wayTagRouter                   *wayTagRouter
	devRouter                      *devRouter
	favoriteUserRouter             *favoriteUserRouter
	favoriteUserWayRouter          *favoriteUserWayRouter
	fromUserMentoringRequestRouter *fromUserMentoringRequestRouter
	geminiRouter                   *geminiRouter
	jobDoneRouter                  *jobDoneRouter
	jobDoneLabelRouter             *jobDoneLabelRouter
	labelRouter                    *labelRouter
	mentorUserWayRouter            *mentorUserWayRouter
	metricRouter                   *metricRouter
	planRouter                     *planRouter
	planLabelRouter                *planLabelRouter
	problemRouter                  *problemRouter
	projectRouter                  *projectRouter
	wayRouter                      *wayRouter
	toUserMentoringRequestRouter   *toUserMentoringRequestRouter
	userRouter                     *userRouter
	userTagRouter                  *userTagRouter
	wayCollectionRouter            *wayCollectionRouter
	wayCollectionWayRouter         *wayCollectionWayRouter
	healthCheckRouter              *healthCheckRouter
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
		Gin:                            ginRouter,
		config:                         config,
		authRouter:                     newAuthRouter(controller.AuthController, config),
		commentRouter:                  newCommentRouter(controller.CommentController, config),
		compositeWayRouter:             newCompositeWayRouter(controller.CompositeWayController, config),
		dayReportRouter:                newDayReportRouter(controller.DayReportController, config),
		devRouter:                      newDevRouter(controller.DevController),
		favoriteUserRouter:             newFavoriteUserRouter(controller.FavoriteUserController, config),
		favoriteUserWayRouter:          newFavoriteUserWayRouter(controller.FavoriteUserWayController, config),
		fromUserMentoringRequestRouter: newFromUserMentoringRequestRouter(controller.FromUserMentoringRequestController, config),
		geminiRouter:                   newGeminiRouter(controller.GeminiController),
		jobDoneRouter:                  newJobDoneRouter(controller.JobDoneController, config),
		jobDoneLabelRouter:             newJobDoneLabelRouter(controller.JobDoneJobTagController, config),
		labelRouter:                    newLabelRouter(controller.JobTagController, config),
		mentorUserWayRouter:            newMentorUserWayRouter(controller.MentorUserWayController, config),
		metricRouter:                   newMetricRouter(controller.MetricController, config),
		planRouter:                     newPlanRouter(controller.PlanController, config),
		planLabelRouter:                newPlanLabelRouter(controller.PlanJobTagController, config),
		problemRouter:                  newProblemRouter(controller.ProblemController, config),
		projectRouter:                  newProjectRouter(controller.ProjectController, config),
		wayRouter:                      newWayRouter(controller.WayController, config),
		wayTagRouter:                   newWayTagRouter(controller.WayTagController, config),
		toUserMentoringRequestRouter:   newToUserMentoringRequestRouter(controller.ToUserMentoringRequestController, config),
		userRouter:                     newUserRouter(controller.UserController, config),
		userTagRouter:                  newUserTagRouter(controller.UserTagController, config),
		wayCollectionRouter:            newWayCollectionRouter(controller.WayCollectionController, config),
		wayCollectionWayRouter:         newWayCollectionWayRouter(controller.WayCollectionWayController, config),
		healthCheckRouter:              newHealthCheckRouter(controller.HealthCheckController),
	}
}

func (r *Router) SetRoutes() {
	api := r.Gin.Group("/api")

	r.authRouter.setAuthRoutes(api)
	r.commentRouter.setCommentRoutes(api)
	r.compositeWayRouter.setCompositeWayRoutes(api)
	r.dayReportRouter.setDayReportRoutes(api)
	r.favoriteUserRouter.setFavoriteUserRoutes(api)
	r.favoriteUserWayRouter.setFavoriteUserWayRoutes(api)
	r.fromUserMentoringRequestRouter.setFromUserMentoringRequestRoutes(api)
	r.geminiRouter.setGeminiRoutes(api)
	r.jobDoneRouter.setJobDoneRoutes(api)
	r.jobDoneLabelRouter.setJobDoneLabelRoutes(api)
	r.labelRouter.setLabelRoutes(api)
	r.mentorUserWayRouter.setMentorUserWayRoutes(api)
	r.metricRouter.setMetricRouter(api)
	r.planRouter.setPlanRoutes(api)
	r.planLabelRouter.setPlanLabelRoutes(api)
	r.problemRouter.setProblemRoutes(api)
	r.projectRouter.setProjectRouter(api)
	r.wayRouter.setWayRoutes(api)
	r.toUserMentoringRequestRouter.setToUserMentoringRequestRoutes(api)
	r.userRouter.setUserRoutes(api)
	r.userTagRouter.setUserTagRoutes(api)
	r.wayCollectionRouter.setWayCollectionRoutes(api)
	r.wayCollectionWayRouter.setWayCollectionWayRoutes(api)
	r.wayTagRouter.setWayTagRoutes(api)
	r.healthCheckRouter.setHealthCheckRoutes(api)

	if r.config.EnvType != "prod" {
		r.devRouter.setDevRoutes(api)
		r.Gin.GET("/docs/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))
	}
}
