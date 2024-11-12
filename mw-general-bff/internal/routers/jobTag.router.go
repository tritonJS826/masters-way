package routers

import (
	"mw-general-bff/internal/auth"
	"mw-general-bff/internal/config"
	"mw-general-bff/internal/controllers"

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
	router := rg.Group("jobTags", auth.HandleHeaders(jr.config))
	{
		router.POST("", jr.jobTagController.CreateJobTag)
		router.PATCH("/:jobTagId", jr.jobTagController.UpdateJobTag)
		router.DELETE("/:jobTagId", jr.jobTagController.DeleteJobTagById)
	}
}
