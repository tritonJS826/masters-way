package routes

import (
	"mwserver/auth"
	"mwserver/controllers"

	"github.com/gin-gonic/gin"
)

type MetricRoutes struct {
	metricController controllers.MetricController
}

func NewRouteMetric(metricController controllers.MetricController) MetricRoutes {
	return MetricRoutes{metricController}
}

func (cr *MetricRoutes) MetricRoute(rg *gin.RouterGroup) {
	router := rg.Group("metrics")
	router.POST("", auth.AuthMiddleware(), cr.metricController.CreateMetric)
	router.PATCH("/:metricId", auth.AuthMiddleware(), cr.metricController.UpdateMetric)
	router.DELETE("/:metricId", auth.AuthMiddleware(), cr.metricController.DeleteMetricById)
}
