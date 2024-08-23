package routers

import (
	"mwserver/auth"
	"mwserver/internal/controllers"

	"github.com/gin-gonic/gin"
)

type WayTagRouter struct {
	wayTagController *controllers.WayTagController
}

func NewWayTagRouter(wayTagController *controllers.WayTagController) *WayTagRouter {
	return &WayTagRouter{wayTagController}
}

func (wtr *WayTagRouter) setWayTagRoutes(rg *gin.RouterGroup) {
	router := rg.Group("wayTags")
	router.POST("", auth.AuthMiddleware(), wtr.wayTagController.AddWayTagToWay)
	router.DELETE("/:wayTagId/:wayId", auth.AuthMiddleware(), wtr.wayTagController.DeleteWayTagFromWayByTagId)
}
