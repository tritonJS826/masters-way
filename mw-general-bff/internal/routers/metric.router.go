package routers

import (
	"mw-general-bff/internal/auth"
	"mw-general-bff/internal/config"
	"mw-general-bff/internal/controllers"

	"github.com/gin-gonic/gin"
)

type metricRouter struct {
	metricController *controllers.MetricController
	config           *config.Config
}

func newMetricRouter(metricController *controllers.MetricController, config *config.Config) *metricRouter {
	return &metricRouter{metricController, config}
}

func (mr *metricRouter) setMetricRouter(rg *gin.RouterGroup) {
	router := rg.Group("metrics", auth.HandleHeaders(mr.config))
	{
		router.POST("", mr.metricController.CreateMetric)
		router.PATCH("/:metricId", mr.metricController.UpdateMetric)
		router.DELETE("/:metricId", mr.metricController.DeleteMetricById)
	}
}
