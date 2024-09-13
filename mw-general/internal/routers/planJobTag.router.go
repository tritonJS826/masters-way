package routers

import (
	"mw-general/internal/auth"
	"mw-general/internal/config"
	"mw-general/internal/controllers"

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
	router := rg.Group("planJobTags")
	router.POST("", auth.AuthMiddleware(pr.config), pr.planJobTagController.CreatePlanJobTag)
	router.DELETE("/:jobTagId/:planId", auth.AuthMiddleware(pr.config), pr.planJobTagController.DeletePlanJobTagById)
}
