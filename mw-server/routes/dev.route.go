package routes

import (
	"mwserver/controllers"

	"github.com/gin-gonic/gin"
)

type DevRoutes struct {
	devController controllers.DevController
}

func NewRouteDev(devController controllers.DevController) DevRoutes {
	return DevRoutes{devController}
}

func (cr *DevRoutes) DevRoute(rg *gin.RouterGroup) {
	router := rg.Group("dev")
	router.GET("reset-db", cr.devController.ResetDb)

}
