package controllers

import (
	"net/http"

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
// @ID general-health-check
// @Accept json
// @Produce json
// @Success 204
// @Router /healthcheck [get]
func (cc *HealthCheckController) GetAPIHealthStatus(ctx *gin.Context) {
	ctx.Status(http.StatusNoContent)
}
