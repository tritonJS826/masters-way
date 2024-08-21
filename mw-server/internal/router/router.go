package router

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

type Router struct {
	Gin *gin.Engine

	// routers
}

func NewRouter() *Router {
	ginRouter := gin.Default()

	ginRouter.NoRoute(func(ctx *gin.Context) {
		ctx.JSON(http.StatusNotFound, gin.H{"status": "failed", "message": fmt.Sprintf("The specified route %s not found", ctx.Request.URL)})
	})

	api := ginRouter.Group("/api")

	api.GET("/healthcheck", func(ctx *gin.Context) {
		ctx.JSON(http.StatusOK, gin.H{"message": "The way APi is working fine"})
	})

	return &Router{
		Gin: ginRouter,

		// routers
	}
}
