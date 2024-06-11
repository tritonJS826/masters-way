package routes

import (
	"mwserver/auth"
	"mwserver/controllers"

	"github.com/gin-gonic/gin"
)

type PlanRoutes struct {
	planController controllers.PlanController
}

func NewRoutePlan(planController controllers.PlanController) PlanRoutes {
	return PlanRoutes{planController}
}

func (cr *PlanRoutes) PlanRoute(rg *gin.RouterGroup) {
	router := rg.Group("plans")
	router.POST("", auth.AuthMiddleware(), cr.planController.CreatePlan)
	router.PATCH("/:planId", auth.AuthMiddleware(), cr.planController.UpdatePlan)
	router.DELETE("/:planId", auth.AuthMiddleware(), cr.planController.DeletePlanById)
}
