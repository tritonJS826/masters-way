package controllers

import (
	"mw-general-bff/internal/services"
	"mw-general-bff/pkg/utils"
	"net/http"

	"github.com/gin-gonic/gin"
)

type HealthCheckController struct {
	generalService *services.GeneralService
}

func NewHealthCheckController(generalService *services.GeneralService) *HealthCheckController {
	return &HealthCheckController{generalService}
}

// @Summary Health Check
// @Description Get the health status of the API
// @Tags Health
// @Accept json
// @Produce json
// @Success 204
// @Router /healthcheck [get]
func (cc *HealthCheckController) GetGeneralHealthStatus(ctx *gin.Context) {
	err := cc.generalService.GeneralHealthCheck(ctx)
	utils.HandleErrorGin(ctx, err)
	ctx.Status(http.StatusNoContent)
}
