package routes

import (
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
	router.POST("", cr.metricController.CreateMetric)
	router.GET("/:wayId", cr.metricController.GetMetricsByWayId)
	router.PATCH("/:metricId", cr.metricController.UpdateMetric)
	router.DELETE("/:metricId", cr.metricController.DeleteMetricById)
}
