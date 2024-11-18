package routers

import (
	"mw-server/internal/auth"
	"mw-server/internal/config"
	"mw-server/internal/controllers"

	"github.com/gin-gonic/gin"
)

type jobTagRouter struct {
	jobTagController *controllers.JobTagController
	config           *config.Config
}

func newJobTagRouter(jobTagController *controllers.JobTagController, config *config.Config) *jobTagRouter {
	return &jobTagRouter{jobTagController, config}
}

func (jr *jobTagRouter) setJobTagRoutes(rg *gin.RouterGroup) {
	router := rg.Group("jobTags")
	router.POST("", auth.AuthMiddleware(jr.config), jr.jobTagController.CreateJobTag)
	router.PATCH("/:jobTagId", auth.AuthMiddleware(jr.config), jr.jobTagController.UpdateJobTag)
	router.DELETE("/:jobTagId", auth.AuthMiddleware(jr.config), jr.jobTagController.DeleteJobTagById)
}
