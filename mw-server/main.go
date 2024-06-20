package main

import (
	"context"
	"database/sql"
	"fmt"
	"log"
	"net/http"

	"mwserver/config"
	"mwserver/controllers"
	dbCon "mwserver/db/sqlc"
	"mwserver/routes"
	"mwserver/services"

	_ "mwserver/docs"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	_ "github.com/lib/pq"
	ginSwagger "github.com/swaggo/gin-swagger"

	swaggerFiles "github.com/swaggo/files"
)

var (
	server *gin.Engine
	db     *dbCon.Queries
	ctx    context.Context

	LimitService services.LimitService

	AuthController controllers.AuthController
	AuthRoutes     routes.AuthRoutes

	WayController controllers.WayController
	WayRoutes     routes.WayRoutes

	UserController controllers.UserController
	UserRoutes     routes.UserRoutes

	DayReportController controllers.DayReportController
	DayReportRoutes     routes.DayReportRoutes

	WayCollectionController controllers.WayCollectionController
	WayCollectionRoutes     routes.WayCollectionRoutes

	CommentController controllers.CommentController
	CommentRoutes     routes.CommentRoutes

	FavoriteUserController controllers.FavoriteUserController
	FavoriteUserRoutes     routes.FavoriteUserRoutes

	FavoriteUserWayController controllers.FavoriteUserWayController
	FavoriteUserWayRoutes     routes.FavoriteUserWayRoutes

	FromUserMentoringRequestController controllers.FromUserMentoringRequestController
	FromUserMentoringRequestRoutes     routes.FromUserMentoringRequestRoutes

	JobDoneController controllers.JobDoneController
	JobDoneRoutes     routes.JobDoneRoutes

	JobDoneJobTagController controllers.JobDoneJobTagController
	JobDoneJobTagRoutes     routes.JobDoneJobTagRoutes

	JobTagController controllers.JobTagController
	JobTagRoutes     routes.JobTagRoutes

	MetricController controllers.MetricController
	MetricRoutes     routes.MetricRoutes

	PlanController controllers.PlanController
	PlanRoutes     routes.PlanRoutes

	PlanJobTagController controllers.PlanJobTagController
	PlanJobTagRoutes     routes.PlanJobTagRoutes

	ProblemController controllers.ProblemController
	ProblemRoutes     routes.ProblemRoutes

	ProblemJobTagController controllers.ProblemJobTagController
	ProblemJobTagRoutes     routes.ProblemJobTagRoutes

	ToUserMentoringRequestController controllers.ToUserMentoringRequestController
	ToUserMentoringRequestRoutes     routes.ToUserMentoringRequestRoutes

	UserTagController controllers.UserTagController
	UserTagRoutes     routes.UserTagRoutes

	WayCollectionWayController controllers.WayCollectionWayController
	WayCollectionWayRoutes     routes.WayCollectionWayRoutes

	WayTagController controllers.WayTagController
	WayTagRoutes     routes.WayTagRoutes

	CompositeWayController controllers.CompositeWayController
	CompositeWayRoutes     routes.CompositeWayRoutes

	MentorUserWayController controllers.MentorUserWayController
	MentorUserWayRoutes     routes.MentorUserWayRoutes
)

func init() {
	ctx = context.TODO()
	conn, err := sql.Open(config.Env.DbDriver, config.Env.DbSource)
	if err != nil {
		log.Fatalf("Could not connect to database: %v", err)
	}

	db = dbCon.New(conn)

	fmt.Println("PostgreSql connected successfully...")

	// auth.NewAuth()
	server = gin.Default()

	// Apply CORS middleware with custom options
	server.Use(cors.New(cors.Config{
		// AllowOrigins: []string{"*"},
		AllowOrigins:     []string{config.Env.WebappBaseUrl},
		AllowMethods:     []string{"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Accept", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
	}))

	LimitService = *services.NewLimitService(db, ctx)

	AuthController = *controllers.NewAuthController(db, ctx)
	AuthRoutes = routes.NewRouteAuth(AuthController)

	WayController = *controllers.NewWayController(db, ctx, &LimitService)
	WayRoutes = routes.NewRouteWay(WayController)

	UserController = *controllers.NewUserController(db, ctx)
	UserRoutes = routes.NewRouteUser(UserController)

	DayReportController = *controllers.NewDayReportController(db, ctx, &LimitService)
	DayReportRoutes = routes.NewRouteDayReport(DayReportController)

	WayCollectionController = *controllers.NewWayCollectionController(db, ctx, &LimitService)
	WayCollectionRoutes = routes.NewRouteWayCollection(WayCollectionController)

	CommentController = *controllers.NewCommentController(db, ctx)
	CommentRoutes = routes.NewRouteComment(CommentController)

	FavoriteUserController = *controllers.NewFavoriteUserController(db, ctx)
	FavoriteUserRoutes = routes.NewRouteFavoriteUser(FavoriteUserController)

	FavoriteUserWayController = *controllers.NewFavoriteUserWayController(db, ctx)
	FavoriteUserWayRoutes = routes.NewRouteFavoriteUserWay(FavoriteUserWayController)

	FromUserMentoringRequestController = *controllers.NewFromUserMentoringRequestController(db, ctx)
	FromUserMentoringRequestRoutes = routes.NewRouteFromUserMentoringRequest(FromUserMentoringRequestController)

	JobDoneController = *controllers.NewJobDoneController(db, ctx)
	JobDoneRoutes = routes.NewRouteJobDone(JobDoneController)

	JobDoneJobTagController = *controllers.NewJobDoneJobTagController(db, ctx)
	JobDoneJobTagRoutes = routes.NewRouteJobDoneJobTag(JobDoneJobTagController)

	JobTagController = *controllers.NewJobTagController(db, ctx)
	JobTagRoutes = routes.NewRouteJobTag(JobTagController)

	MetricController = *controllers.NewMetricController(db, ctx)
	MetricRoutes = routes.NewRouteMetric(MetricController)

	PlanController = *controllers.NewPlanController(db, ctx)
	PlanRoutes = routes.NewRoutePlan(PlanController)

	PlanJobTagController = *controllers.NewPlanJobTagController(db, ctx)
	PlanJobTagRoutes = routes.NewRoutePlanJobTag(PlanJobTagController)

	ProblemController = *controllers.NewProblemController(db, ctx)
	ProblemRoutes = routes.NewRouteProblem(ProblemController)

	ProblemJobTagController = *controllers.NewProblemJobTagController(db, ctx)
	ProblemJobTagRoutes = routes.NewRouteProblemJobTag(ProblemJobTagController)

	ToUserMentoringRequestController = *controllers.NewToUserMentoringRequestController(db, ctx)
	ToUserMentoringRequestRoutes = routes.NewRouteToUserMentoringRequest(ToUserMentoringRequestController)

	UserTagController = *controllers.NewUserTagController(db, ctx, &LimitService)
	UserTagRoutes = routes.NewRouteUserTag(UserTagController)

	WayCollectionWayController = *controllers.NewWayCollectionWayController(db, ctx)
	WayCollectionWayRoutes = routes.NewRouteWayCollectionWay(WayCollectionWayController)

	WayTagController = *controllers.NewWayTagController(db, ctx)
	WayTagRoutes = routes.NewRouteWayTag(WayTagController)

	CompositeWayController = *controllers.NewCompositeWayController(db, ctx)
	CompositeWayRoutes = routes.NewRouteCompositeWay(CompositeWayController)

	MentorUserWayController = *controllers.NewMentorUserWayController(db, ctx, &LimitService)
	MentorUserWayRoutes = routes.NewRouteMentorUserWay(MentorUserWayController)

	if config.Env.EnvType != "prod" {
		server.GET("/docs/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))
	}
}

// @title     Masters way API
// @version 1.0
// @BasePath  /api
func main() {
	router := server.Group("/api")

	router.GET("/healthcheck", func(ctx *gin.Context) {
		ctx.JSON(http.StatusOK, gin.H{"message": "The way APi is working fine"})
	})

	AuthRoutes.AuthRoute(router)
	WayRoutes.WayRoute(router)
	UserRoutes.UserRoute(router)
	DayReportRoutes.DayReportRoute(router)
	WayCollectionRoutes.WayCollectionRoute(router)
	CommentRoutes.CommentRoute(router)
	FavoriteUserRoutes.FavoriteUserRoute(router)
	FavoriteUserWayRoutes.FavoriteUserWayRoute(router)
	FromUserMentoringRequestRoutes.FromUserMentoringRequestRoute(router)
	JobDoneRoutes.JobDoneRoute(router)
	JobDoneJobTagRoutes.JobDoneJobTagRoute(router)
	JobTagRoutes.JobTagRoute(router)
	MetricRoutes.MetricRoute(router)
	PlanRoutes.PlanRoute(router)
	PlanJobTagRoutes.PlanJobTagRoute(router)
	ProblemRoutes.ProblemRoute(router)
	ProblemJobTagRoutes.ProblemJobTagRoute(router)
	ToUserMentoringRequestRoutes.ToUserMentoringRequestRoute(router)
	UserTagRoutes.UserTagRoute(router)
	WayCollectionWayRoutes.WayCollectionWayRoute(router)
	WayTagRoutes.WayTagRoute(router)
	CompositeWayRoutes.CompositeWayRoute(router)
	MentorUserWayRoutes.MentorUserWayRoute(router)

	server.NoRoute(func(ctx *gin.Context) {
		ctx.JSON(http.StatusNotFound, gin.H{"status": "failed", "message": fmt.Sprintf("The specified route %s not found", ctx.Request.URL)})
	})

	if config.Env.EnvType == "prod" {
		log.Fatal(server.RunTLS(":"+config.Env.ServerAddress, "./server.crt", "./server.key"))
	} else {
		log.Fatal(server.Run(":" + config.Env.ServerAddress))
	}
}
