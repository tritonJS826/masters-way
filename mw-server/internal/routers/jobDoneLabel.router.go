package routers

import (
	"mwserver/internal/auth"
	"mwserver/internal/config"
	"mwserver/internal/controllers"

	"github.com/gin-gonic/gin"
)

type jobDoneLabelRouter struct {
	jobDoneLabelController *controllers.JobDoneLabelController
	config                 *config.Config
}

func newJobDoneLabelRouter(jobDoneLabelController *controllers.JobDoneLabelController, config *config.Config) *jobDoneLabelRouter {
	return &jobDoneLabelRouter{jobDoneLabelController, config}
}

func (jr *jobDoneLabelRouter) setJobDoneLabelRoutes(rg *gin.RouterGroup) {
	router := rg.Group("jobDoneLabels")
	router.POST("", auth.AuthMiddleware(jr.config), jr.jobDoneLabelController.CreateJobDoneLabel)
	router.DELETE("/:labelId/:jobDoneId", auth.AuthMiddleware(jr.config), jr.jobDoneLabelController.DeleteJobDoneLabelById)
}
