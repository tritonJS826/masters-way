package routers

import (
	"mwserver/internal/auth"
	"mwserver/internal/config"
	"mwserver/internal/controllers"

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
