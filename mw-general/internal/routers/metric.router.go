package routers

import (
	"mw-general/internal/auth"
	"mw-general/internal/config"
	"mw-general/internal/controllers"

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
	router := rg.Group("metrics")
	router.POST("", auth.AuthMiddleware(mr.config), mr.metricController.CreateMetric)
	router.PATCH("/:metricId", auth.AuthMiddleware(mr.config), mr.metricController.UpdateMetric)
	router.DELETE("/:metricId", auth.AuthMiddleware(mr.config), mr.metricController.DeleteMetricById)
}
