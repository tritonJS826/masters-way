package controllers

import (
	"mwnotification/internal/services"
	"mwnotification/pkg/utils"
	"net/http"

	"github.com/gin-gonic/gin"
)

type DevController struct {
	devService *services.DevService
}

func NewDevController(devService *services.DevService) *DevController {
	return &DevController{devService}
}

// Reset db
// @Summary resets db
// @Description resets db
// @Tags dev
// @Success 204
// @Router /dev/resetDb [get]
func (dc *DevController) ResetDB(ctx *gin.Context) {
	err := dc.devService.ResetDB(ctx)
	utils.HandleErrorGin(ctx, err)

	ctx.Status(http.StatusNoContent)
}
