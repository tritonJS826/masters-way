package routers

import (
	"mwserver/internal/auth"
	"mwserver/internal/config"
	"mwserver/internal/controllers"

	"github.com/gin-gonic/gin"
)

type labelRouter struct {
	labelController *controllers.LabelController
	config          *config.Config
}

func newLabelRouter(labelController *controllers.LabelController, config *config.Config) *labelRouter {
	return &labelRouter{labelController, config}
}

func (jr *labelRouter) setLabelRoutes(rg *gin.RouterGroup) {
	router := rg.Group("labels")
	router.POST("", auth.AuthMiddleware(jr.config), jr.labelController.CreateLabel)
	router.PATCH("/:labelId", auth.AuthMiddleware(jr.config), jr.labelController.UpdateLabel)
	router.DELETE("/:labelId", auth.AuthMiddleware(jr.config), jr.labelController.DeleteLabelById)
}
