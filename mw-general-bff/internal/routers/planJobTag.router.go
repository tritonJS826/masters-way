package routers

import (
	"mw-general-bff/internal/auth"
	"mw-general-bff/internal/config"
	"mw-general-bff/internal/controllers"

	"github.com/gin-gonic/gin"
)

type planJobTagRouter struct {
	planJobTagController *controllers.PlanJobTagController
	config               *config.Config
}

func newPlanJobTagRouter(planJobTagController *controllers.PlanJobTagController, config *config.Config) *planJobTagRouter {
	return &planJobTagRouter{planJobTagController, config}
}

func (pr *planJobTagRouter) setPlanJobTagRoutes(rg *gin.RouterGroup) {
	router := rg.Group("planJobTags", auth.HandleHeaders(pr.config))
	{
		router.POST("", pr.planJobTagController.CreatePlanJobTag)
		router.DELETE("/:jobTagId/:planId", pr.planJobTagController.DeletePlanJobTagById)
	}
}
