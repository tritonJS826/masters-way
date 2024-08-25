package routers

import (
	"mwserver/auth"
	"mwserver/internal/controllers"

	"github.com/gin-gonic/gin"
)

type JobDoneRouter struct {
	jobDoneController *controllers.JobDoneController
}

func NewJobDoneRouter(jobDoneController *controllers.JobDoneController) *JobDoneRouter {
	return &JobDoneRouter{jobDoneController}
}

func (jdr *JobDoneRouter) setJobDoneRoutes(rg *gin.RouterGroup) {
	router := rg.Group("jobDones")
	router.POST("", auth.AuthMiddleware(), jdr.jobDoneController.CreateJobDone)
	router.PATCH("/:jobDoneId", auth.AuthMiddleware(), jdr.jobDoneController.UpdateJobDone)
	router.DELETE("/:jobDoneId", auth.AuthMiddleware(), jdr.jobDoneController.DeleteJobDoneById)
}
