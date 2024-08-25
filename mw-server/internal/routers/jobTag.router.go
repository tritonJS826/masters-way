package routers

import (
	"mwserver/auth"
	"mwserver/internal/controllers"

	"github.com/gin-gonic/gin"
)

type JobTagRouter struct {
	jobTagController *controllers.JobTagController
}

func NewJobTagRouter(jobTagController *controllers.JobTagController) *JobTagRouter {
	return &JobTagRouter{jobTagController}
}

func (jr *JobTagRouter) setJobTagRoutes(rg *gin.RouterGroup) {
	router := rg.Group("jobTags")
	router.POST("", auth.AuthMiddleware(), jr.jobTagController.CreateJobTag)
	router.PATCH("/:jobTagId", auth.AuthMiddleware(), jr.jobTagController.UpdateJobTag)
	router.DELETE("/:jobTagId", auth.AuthMiddleware(), jr.jobTagController.DeleteJobTagById)
}
