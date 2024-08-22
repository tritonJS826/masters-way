package routers

import (
	"fmt"
	"mwserver/internal/controllers"
	"net/http"

	"github.com/gin-gonic/gin"
)

type IAuthRouter interface {
	SetAuthRoutes(rg *gin.RouterGroup)
}

type ICommentRouter interface {
	SetCommentRoutes(rg *gin.RouterGroup)
}

type Router struct {
	Gin *gin.Engine

	IAuthRouter
	ICommentRouter
}

func NewRouter(controller *controllers.Controller) *Router {
	ginRouter := gin.Default()

	ginRouter.NoRoute(func(ctx *gin.Context) {
		ctx.JSON(http.StatusNotFound, gin.H{"status": "failed", "message": fmt.Sprintf("The specified route %s not found", ctx.Request.URL)})
	})

	return &Router{
		Gin:            ginRouter,
		IAuthRouter:    NewAuthRouter(controller.IAuthController),
		ICommentRouter: NewCommentRouter(controller.ICommentController),
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

	router.IAuthRouter.SetAuthRoutes(api)
}
