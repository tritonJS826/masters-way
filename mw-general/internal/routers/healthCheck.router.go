package routers

import (
	"mwserver/internal/controllers"

	"github.com/gin-gonic/gin"
)

type healthCheckRouter struct {
	healthCheckController *controllers.HealthCheckController
}

func newHealthCheckRouter(healthCheckController *controllers.HealthCheckController) *healthCheckRouter {
	return &healthCheckRouter{healthCheckController}
}

func (hr *healthCheckRouter) setHealthCheckRoutes(rg *gin.RouterGroup) {
	router := rg.Group("healthcheck")
	router.GET("", hr.healthCheckController.GetAPIHealthStatus)
}
