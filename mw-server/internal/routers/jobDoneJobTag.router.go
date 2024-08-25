package routers

import (
	"mwserver/internal/auth"
	"mwserver/internal/config"
	"mwserver/internal/controllers"

	"github.com/gin-gonic/gin"
)

type jobDoneJobTagRouter struct {
	jobDoneJobTagController *controllers.JobDoneJobTagController
	config                  *config.Config
}

func newJobDoneJobTagRouter(jobDoneJobTagController *controllers.JobDoneJobTagController, config *config.Config) *jobDoneJobTagRouter {
	return &jobDoneJobTagRouter{jobDoneJobTagController, config}
}

func (jr *jobDoneJobTagRouter) setJobDoneJobTagRoutes(rg *gin.RouterGroup) {
	router := rg.Group("jobDoneJobTags")
	router.POST("", auth.AuthMiddleware(jr.config), jr.jobDoneJobTagController.CreateJobDoneJobTag)
	router.DELETE("/:jobTagId/:jobDoneId", auth.AuthMiddleware(jr.config), jr.jobDoneJobTagController.DeleteJobDoneJobTagById)
}
