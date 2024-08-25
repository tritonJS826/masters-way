package controllers

import (
	"mwserver/internal/services"
	"mwserver/pkg/util"
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
// @Success 200
// @Router /reset-db [post]
func (dc *DevController) ResetDb(ctx *gin.Context) {

	err := dc.devService.ResetDb(ctx)
	util.HandleErrorGin(ctx, err)

	ctx.Status(http.StatusOK)
}
