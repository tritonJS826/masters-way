package routers

import (
	"mw-general/internal/controllers"

	"github.com/gin-gonic/gin"
)

type devRouter struct {
	devController *controllers.DevController
}

func newDevRouter(devController *controllers.DevController) *devRouter {
	return &devRouter{devController}
}

func (cr *devRouter) setDevRoutes(rg *gin.RouterGroup) {
	router := rg.Group("dev")
	router.GET("reset-db", cr.devController.ResetDB)
}
