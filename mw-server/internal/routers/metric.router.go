package routers

import (
	"mwserver/auth"
	"mwserver/internal/controllers"

	"github.com/gin-gonic/gin"
)

type MetricRouter struct {
	metricController *controllers.MetricController
}

func NewMetricRouter(metricController *controllers.MetricController) *MetricRouter {
	return &MetricRouter{metricController}
}

func (mr *MetricRouter) setMetricRouter(rg *gin.RouterGroup) {
	router := rg.Group("metrics")
	router.POST("", auth.AuthMiddleware(), mr.metricController.CreateMetric)
	router.PATCH("/:metricId", auth.AuthMiddleware(), mr.metricController.UpdateMetric)
	router.DELETE("/:metricId", auth.AuthMiddleware(), mr.metricController.DeleteMetricById)
}
