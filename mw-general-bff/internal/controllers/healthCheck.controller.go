package controllers

import (
	"github.com/gin-gonic/gin"
)

type HealthCheckController struct {
}

func NewHealthCheckController() *HealthCheckController {
	return &HealthCheckController{}
}

// @Summary Health Check
// @Description Get the health status of the API
// @Tags Health
// @Accept json
// @Produce json
// @Success 204
// @Router /healthcheck [get]
func (cc *HealthCheckController) GetAPIHealthStatus(ctx *gin.Context) {
	// ctx.Status(http.StatusNoContent)
}
