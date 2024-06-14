package routes

import (
	"mwserver/auth"
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
	router.POST("", auth.AuthMiddleware(), cr.jobDoneController.CreateJobDone)
	router.PATCH("/:jobDoneId", auth.AuthMiddleware(), cr.jobDoneController.UpdateJobDone)
	router.DELETE("/:jobDoneId", auth.AuthMiddleware(), cr.jobDoneController.DeleteJobDoneById)
}
