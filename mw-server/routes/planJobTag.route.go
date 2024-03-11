package routes

import (
	"mwserver/controllers"

	"github.com/gin-gonic/gin"
)

type PlanJobTagRoutes struct {
	planJobTagController controllers.PlanJobTagController
}

func NewRoutePlanJobTag(planJobTagController controllers.PlanJobTagController) PlanJobTagRoutes {
	return PlanJobTagRoutes{planJobTagController}
}

func (cr *PlanJobTagRoutes) PlanJobTagRoute(rg *gin.RouterGroup) {
	router := rg.Group("planJobTags")
	router.POST("", cr.planJobTagController.CreatePlanJobTag)
	router.DELETE("/:jobTagId/:planId", cr.planJobTagController.DeletePlanJobTagById)
}
