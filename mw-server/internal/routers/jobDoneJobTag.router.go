package routers

import (
	"mwserver/auth"
	"mwserver/internal/controllers"

	"github.com/gin-gonic/gin"
)

type JobDoneJobTagRouter struct {
	jobDoneJobTagController *controllers.JobDoneJobTagController
}

func NewJobDoneJobTagRouter(jobDoneJobTagController *controllers.JobDoneJobTagController) *JobDoneJobTagRouter {
	return &JobDoneJobTagRouter{jobDoneJobTagController}
}

func (jr *JobDoneJobTagRouter) setJobDoneJobTagRoutes(rg *gin.RouterGroup) {
	router := rg.Group("jobDoneJobTags")
	router.POST("", auth.AuthMiddleware(), jr.jobDoneJobTagController.CreateJobDoneJobTag)
	router.DELETE("/:jobTagId/:jobDoneId", auth.AuthMiddleware(), jr.jobDoneJobTagController.DeleteJobDoneJobTagById)
}
