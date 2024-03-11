package routes

import (
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
	router.POST("", cr.jobTagController.CreateJobTag)
	router.PATCH("/:jobTagId", cr.jobTagController.UpdateJobTag)
	router.GET("/:wayId", cr.jobTagController.GetJobTagsByWayId)
	router.DELETE("/:jobTagId", cr.jobTagController.DeleteJobTagById)
}
