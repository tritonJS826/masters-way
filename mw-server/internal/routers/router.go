package routers

import (
	"fmt"
	"mwserver/internal/controllers"
	"net/http"

	"github.com/gin-gonic/gin"
)

type Router struct {
	Gin *gin.Engine

	authRouter         *AuthRouter
	commentRouter      *CommentRouter
	compositeWayRouter *CompositeWayRouter
	dayReportRouter    *DayReportRouter
	wayTagRouter       *WayTagRouter
}

func NewRouter(controller *controllers.Controller) *Router {
	ginRouter := gin.Default()

	ginRouter.NoRoute(func(ctx *gin.Context) {
		ctx.JSON(http.StatusNotFound, gin.H{"status": "failed", "message": fmt.Sprintf("The specified route %s not found", ctx.Request.URL)})
	})

	return &Router{
		Gin:                ginRouter,
		authRouter:         NewAuthRouter(controller.AuthController),
		commentRouter:      NewCommentRouter(controller.CommentController),
		compositeWayRouter: NewCompositeWayRouter(controller.CompositeWayController),
		dayReportRouter:    NewDayReportRouter(controller.DayReportController),
		wayTagRouter:       NewWayTagRouter(controller.WayTagController),
	}
}

// @title     Masters way chat API
// @version 1.0
// @BasePath  /chat
func (router *Router) SetRoutes() {
	api := router.Gin.Group("/api")

	api.GET("/healthcheck", func(ctx *gin.Context) {
		ctx.JSON(http.StatusOK, gin.H{"message": "The way APi is working fine"})
	})

	router.authRouter.SetAuthRoutes(api)
	router.commentRouter.SetCommentRoutes(api)
	router.compositeWayRouter.SetCompositeWayRoutes(api)
	router.dayReportRouter.SetDayReportRoutes(api)
	router.wayTagRouter.SetWayTagRoutes(api)
}
