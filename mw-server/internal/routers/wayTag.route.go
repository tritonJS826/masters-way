package routers

import (
	"mwserver/auth"
	"mwserver/internal/controllers"

	"github.com/gin-gonic/gin"
)

type WayTagRouter struct {
	wayTagController controllers.IWayTagController
}

func NewRouteWayTag(wayTagController controllers.IWayTagController) *WayTagRouter {
	return &WayTagRouter{wayTagController}
}

func (wtr *WayTagRouter) SetWayTagRoutes(rg *gin.RouterGroup) {
	router := rg.Group("wayTags")
	router.POST("", auth.AuthMiddleware(), wtr.wayTagController.AddWayTagToWay)
	router.DELETE("/:wayTagId/:wayId", auth.AuthMiddleware(), wtr.wayTagController.DeleteWayTagFromWayByTagId)
}