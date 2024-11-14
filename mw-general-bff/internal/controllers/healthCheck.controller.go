package controllers

import (
	"mw-general-bff/internal/facades"
	"mw-general-bff/pkg/utils"
	"net/http"

	"github.com/gin-gonic/gin"
)

type HealthCheckController struct {
	healthCheckFacade *facades.HealthCheckFacade
}

func NewHealthCheckController(healthCheckFacade *facades.HealthCheckFacade) *HealthCheckController {
	return &HealthCheckController{healthCheckFacade}
}

// @Summary Health Check
// @Description Get the health status of the API
// @Tags Health
// @Accept json
// @Produce json
// @Success 204
// @Router /healthcheck [get]
func (cc *HealthCheckController) GetGeneralHealthStatus(ctx *gin.Context) {
	err := cc.healthCheckFacade.GeneralHealthCheck(ctx)
	utils.HandleErrorGin(ctx, err)
	ctx.Status(http.StatusNoContent)
}
