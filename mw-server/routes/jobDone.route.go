package routes

import (
	"mwserver/controllers"

	"github.com/gin-gonic/gin"
)

type JobDoneRoutes struct {
	jobDoneController controllers.JobDoneController
}

func NewRouteJobDone(jobDoneController controllers.JobDoneController) JobDoneRoutes {
	return JobDoneRoutes{jobDoneController}
}

func (cr *JobDoneRoutes) JobDoneRoute(rg *gin.RouterGroup) {
	router := rg.Group("jobDones")
	router.POST("", cr.jobDoneController.CreateJobDone)
	router.GET("/:dayReportId", cr.jobDoneController.GetJobDonesByDayReportId)
	router.PATCH("/:jobDoneId", cr.jobDoneController.UpdateJobDone)
	router.DELETE("/:jobDoneId", cr.jobDoneController.DeleteJobDoneById)
}
