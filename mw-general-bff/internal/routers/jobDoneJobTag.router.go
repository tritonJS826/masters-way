package routers

import (
	"mw-general-bff/internal/auth"
	"mw-general-bff/internal/config"
	"mw-general-bff/internal/controllers"

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
	router := rg.Group("jobDoneJobTags", auth.HandleHeaders(jr.config))
	{
		router.POST("", jr.jobDoneJobTagController.CreateJobDoneJobTag)
		router.DELETE("/:jobTagId/:jobDoneId", jr.jobDoneJobTagController.DeleteJobDoneJobTagById)
	}
}
