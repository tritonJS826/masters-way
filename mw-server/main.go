package main

import (
	"context"
	"database/sql"
	"fmt"
	"log"
	"net/http"

	"mwserver/controllers"
	dbCon "mwserver/db/sqlc"
	_ "mwserver/docs"
	"mwserver/routes"
	"mwserver/util"

	_ "mwserver/docs"

	"github.com/gin-gonic/gin"
	_ "github.com/lib/pq"
	ginSwagger "github.com/swaggo/gin-swagger"

	swaggerFiles "github.com/swaggo/files"
)

var (
	server *gin.Engine
	db     *dbCon.Queries
	ctx    context.Context

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

	FormerMentorWayController controllers.FormerMentorWayController
	FormerMentorWayRoutes     routes.FormerMentorWayRoutes

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
)

func init() {
	ctx = context.TODO()
	config, err := util.LoadConfig(".")

	if err != nil {
		log.Fatalf("could not loadconfig: %v", err)
	}

	conn, err := sql.Open(config.DbDriver, config.DbSource)
	if err != nil {
		log.Fatalf("Could not connect to database: %v", err)
	}

	db = dbCon.New(conn)

	fmt.Println("PostgreSql connected successfully...")

	WayController = *controllers.NewWayController(db, ctx)
	WayRoutes = routes.NewRouteWay(WayController)

	UserController = *controllers.NewUserController(db, ctx)
	UserRoutes = routes.NewRouteUser(UserController)

	DayReportController = *controllers.NewDayReportController(db, ctx)
	DayReportRoutes = routes.NewRouteDayReport(DayReportController)

	WayCollectionController = *controllers.NewWayCollectionController(db, ctx)
	WayCollectionRoutes = routes.NewRouteWayCollection(WayCollectionController)

	CommentController = *controllers.NewCommentController(db, ctx)
	CommentRoutes = routes.NewRouteComment(CommentController)

	FavoriteUserController = *controllers.NewFavoriteUserController(db, ctx)
	FavoriteUserRoutes = routes.NewRouteFavoriteUser(FavoriteUserController)

	FavoriteUserWayController = *controllers.NewFavoriteUserWayController(db, ctx)
	FavoriteUserWayRoutes = routes.NewRouteFavoriteUserWay(FavoriteUserWayController)

	FormerMentorWayController = *controllers.NewFormerMentorWayController(db, ctx)
	FormerMentorWayRoutes = routes.NewRouteFormerMentorWay(FormerMentorWayController)

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

	UserTagController = *controllers.NewUserTagController(db, ctx)
	UserTagRoutes = routes.NewRouteUserTag(UserTagController)

	WayCollectionWayController = *controllers.NewWayCollectionWayController(db, ctx)
	WayCollectionWayRoutes = routes.NewRouteWayCollectionWay(WayCollectionWayController)

	WayTagController = *controllers.NewWayTagController(db, ctx)
	WayTagRoutes = routes.NewRouteWayTag(WayTagController)

	server = gin.Default()

	server.GET("/docs/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))

}

// @title     Masters way API
// @version 1.0
// @BasePath  /api
func main() {
	config, err := util.LoadConfig(".")

	if err != nil {
		log.Fatalf("failed to load config: %v", err)
	}

	router := server.Group("/api")

	router.GET("/healthcheck", func(ctx *gin.Context) {
		ctx.JSON(http.StatusOK, gin.H{"message": "The way APi is working fine"})
	})

	WayRoutes.WayRoute(router)
	UserRoutes.UserRoute(router)
	DayReportRoutes.DayReportRoute(router)
	WayCollectionRoutes.WayCollectionRoute(router)
	CommentRoutes.CommentRoute(router)
	FavoriteUserRoutes.FavoriteUserRoute(router)
	FavoriteUserWayRoutes.FavoriteUserWayRoute(router)
	FormerMentorWayRoutes.FormerMentorWayRoute(router)
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

	server.NoRoute(func(ctx *gin.Context) {
		ctx.JSON(http.StatusNotFound, gin.H{"status": "failed", "message": fmt.Sprintf("The specified route %s not found", ctx.Request.URL)})
	})

	log.Fatal(server.Run(":" + config.ServerAddress))
}
