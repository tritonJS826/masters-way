package controllers

import (
	"github.com/gin-gonic/gin"
	"mw-general-bff/internal/services"
)

type DevController struct {
	generalService *services.GeneralService
}

func NewDevController(generalService *services.GeneralService) *DevController {
	return &DevController{generalService}
}

// Reset db
// @Summary resets db
// @Description resets db
// @Tags dev
// @Success 204
// @Router /dev/reset-db [get]
func (dc *DevController) ResetDB(ctx *gin.Context) {

	// err := dc.devService.ResetDB(ctx)
	// util.HandleErrorGin(ctx, err)

	// ctx.Status(http.StatusNoContent)
}
