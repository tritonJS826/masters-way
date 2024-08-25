package routers

import (
	"fmt"
	"mwserver/internal/controllers"
	"net/http"

	"github.com/gin-gonic/gin"
)

type Router struct {
	Gin *gin.Engine

	authRouter                     *AuthRouter
	commentRouter                  *CommentRouter
	compositeWayRouter             *CompositeWayRouter
	dayReportRouter                *DayReportRouter
	wayTagRouter                   *WayTagRouter
	devRouter                      *DevRouter
	favoriteUserRouter             *FavoriteUserRouter
	favoriteUserWayRouter          *FavoriteUserWayRouter
	fromUserMentoringRequestRouter *FromUserMentoringRequestRouter
	geminiRouter                   *GeminiRouter
	jobDoneRouter                  *JobDoneRouter
	jobDoneJobTagRouter            *JobDoneJobTagRouter
	jobTagRouter                   *JobTagRouter
	mentorUserWayRouter            *MentorUserWayRouter
	metricRouter                   *MetricRouter
	planRouter                     *PlanRouter
	planJobTagRouter               *PlanJobTagRouter
	problemRouter                  *ProblemRouter
	wayRouter                      *WayRouter
	toUserMentoringRequestRouter   *ToUserMentoringRequestRouter
	userRouter                     *UserRouter
	userTagRouter                  *UserTagRouter
	wayCollectionRouter            *WayCollectionRouter
	wayCollectionWayRouter         *WayCollectionWayRouter
}

func NewRouter(controller *controllers.Controller) *Router {
	ginRouter := gin.Default()

	ginRouter.NoRoute(func(ctx *gin.Context) {
		ctx.JSON(http.StatusNotFound, gin.H{"status": "failed", "message": fmt.Sprintf("The specified route %s not found", ctx.Request.URL)})
	})

	return &Router{
		Gin:                            ginRouter,
		authRouter:                     NewAuthRouter(controller.AuthController),
		commentRouter:                  NewCommentRouter(controller.CommentController),
		compositeWayRouter:             NewCompositeWayRouter(controller.CompositeWayController),
		dayReportRouter:                NewDayReportRouter(controller.DayReportController),
		devRouter:                      NewDevRouter(controller.DevController),
		favoriteUserRouter:             NewFavoriteUserRouter(controller.FavoriteUserController),
		favoriteUserWayRouter:          NewFavoriteUserWayRouter(controller.FavoriteUserWayController),
		fromUserMentoringRequestRouter: NewFromUserMentoringRequestRouter(controller.FromUserMentoringRequestController),
		geminiRouter:                   NewGeminiRouter(controller.GeminiController),
		jobDoneRouter:                  NewJobDoneRouter(controller.JobDoneController),
		jobDoneJobTagRouter:            NewJobDoneJobTagRouter(controller.JobDoneJobTagController),
		jobTagRouter:                   NewJobTagRouter(controller.JobTagController),
		mentorUserWayRouter:            NewMentorUserWayRouter(controller.MentorUserWayController),
		metricRouter:                   NewMetricRouter(controller.MetricController),
		planRouter:                     NewPlanRouter(controller.PlanController),
		planJobTagRouter:               NewRoutePlanJobTag(controller.PlanJobTagController),
		problemRouter:                  NewProblemRouter(controller.ProblemController),
		wayRouter:                      NewWayRouter(controller.WayController),
		wayTagRouter:                   NewWayTagRouter(controller.WayTagController),
		toUserMentoringRequestRouter:   NewToUserMentoringRequestRouter(controller.ToUserMentoringRequestController),
		userRouter:                     NewUserRouter(controller.UserController),
		userTagRouter:                  NewUserTagRouter(controller.UserTagController),
		wayCollectionRouter:            NewWayCollectionRouter(controller.WayCollectionController),
		wayCollectionWayRouter:         NewWayCollectionWayRouter(controller.WayCollectionWayController),
	}
}

// @title     Masters way chat API
// @version 1.0
// @BasePath  /api
func (r *Router) SetRoutes() {
	api := r.Gin.Group("/api")

	api.GET("/healthcheck", func(ctx *gin.Context) {
		ctx.JSON(http.StatusOK, gin.H{"message": "The way APi is working fine"})
	})

	r.authRouter.setAuthRoutes(api)
	r.commentRouter.setCommentRoutes(api)
	r.compositeWayRouter.setCompositeWayRoutes(api)
	r.dayReportRouter.setDayReportRoutes(api)
	r.devRouter.setDevRoutes(api)
	r.favoriteUserRouter.setFavoriteUserRoutes(api)
	r.favoriteUserWayRouter.setFavoriteUserWayRoutes(api)
	r.fromUserMentoringRequestRouter.setFromUserMentoringRequestRoutes(api)
	r.geminiRouter.setGeminiRoutes(api)
	r.jobDoneRouter.setJobDoneRoutes(api)
	r.jobDoneJobTagRouter.setJobDoneJobTagRoutes(api)
	r.jobTagRouter.setJobTagRoutes(api)
	r.mentorUserWayRouter.setMentorUserWayRoutes(api)
	r.metricRouter.setMetricRouter(api)
	r.planRouter.setPlanRoutes(api)
	r.planJobTagRouter.setPlanJobTagRoute(api)
	r.problemRouter.setProblemRoutes(api)
	r.wayRouter.setWayRoutes(api)
	r.toUserMentoringRequestRouter.setToUserMentoringRequestRoutes(api)
	r.userRouter.setUserRoutes(api)
	r.userTagRouter.setUserTagRoutes(api)
	r.wayCollectionRouter.setWayCollectionRoutes(api)
	r.wayCollectionWayRouter.setWayCollectionWayRoutes(api)
	r.wayTagRouter.setWayTagRoutes(api)
}
