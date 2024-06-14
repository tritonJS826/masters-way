package routes

import (
	"mwserver/auth"
	"mwserver/controllers"

	"github.com/gin-gonic/gin"
)

type JobDoneJobTagRoutes struct {
	jobDoneJobTagController controllers.JobDoneJobTagController
}

func NewRouteJobDoneJobTag(jobDoneJobTagController controllers.JobDoneJobTagController) JobDoneJobTagRoutes {
	return JobDoneJobTagRoutes{jobDoneJobTagController}
}

func (cr *JobDoneJobTagRoutes) JobDoneJobTagRoute(rg *gin.RouterGroup) {
	router := rg.Group("jobDoneJobTags")
	router.POST("", auth.AuthMiddleware(), cr.jobDoneJobTagController.CreateJobDoneJobTag)
	router.DELETE("/:jobTagId/:jobDoneId", auth.AuthMiddleware(), cr.jobDoneJobTagController.DeleteJobDoneJobTagById)
}
