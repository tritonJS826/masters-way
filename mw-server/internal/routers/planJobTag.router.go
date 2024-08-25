package routers

import (
	"mwserver/auth"
	"mwserver/internal/controllers"

	"github.com/gin-gonic/gin"
)

type PlanJobTagRouter struct {
	planJobTagController *controllers.PlanJobTagController
}

func NewRoutePlanJobTag(planJobTagController *controllers.PlanJobTagController) *PlanJobTagRouter {
	return &PlanJobTagRouter{planJobTagController}
}

func (pr *PlanJobTagRouter) setPlanJobTagRoute(rg *gin.RouterGroup) {
	router := rg.Group("planJobTags")
	router.POST("", auth.AuthMiddleware(), pr.planJobTagController.CreatePlanJobTag)
	router.DELETE("/:jobTagId/:planId", auth.AuthMiddleware(), pr.planJobTagController.DeletePlanJobTagById)
}
