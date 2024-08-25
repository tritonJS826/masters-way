package routers

import (
	"mwserver/internal/controllers"

	"github.com/gin-gonic/gin"
)

type DevRouter struct {
	devController *controllers.DevController
}

func NewDevRouter(devController *controllers.DevController) *DevRouter {
	return &DevRouter{devController}
}

func (cr *DevRouter) setDevRoutes(rg *gin.RouterGroup) {
	router := rg.Group("dev")
	router.GET("reset-db", cr.devController.ResetDb)
}
