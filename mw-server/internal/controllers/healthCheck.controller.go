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
// @Accept json
// @Produce json
// @Success 200 {object} map[string]string
// @Router /healthcheck [get]
func (cc *HealthCheckController) GetAPIHealthStatus(ctx *gin.Context) {
	ctx.JSON(http.StatusOK, gin.H{"message": "The way APi is working fine"})
}
