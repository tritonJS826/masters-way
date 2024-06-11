package routes

import (
	"mwserver/auth"
	"mwserver/controllers"

	"github.com/gin-gonic/gin"
)

type JobTagRoutes struct {
	jobTagController controllers.JobTagController
}

func NewRouteJobTag(jobTagController controllers.JobTagController) JobTagRoutes {
	return JobTagRoutes{jobTagController}
}

func (cr *JobTagRoutes) JobTagRoute(rg *gin.RouterGroup) {
	router := rg.Group("jobTags")
	router.POST("", auth.AuthMiddleware(), cr.jobTagController.CreateJobTag)
	router.PATCH("/:jobTagId", auth.AuthMiddleware(), cr.jobTagController.UpdateJobTag)
	router.DELETE("/:jobTagId", auth.AuthMiddleware(), cr.jobTagController.DeleteJobTagById)
}
