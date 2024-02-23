package routes

import (
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
	router.POST("/", cr.planController.CreatePlan)
	router.GET("/:dayReportId", cr.planController.GetPlansByDayReportId)
	router.PATCH("/:planId", cr.planController.UpdatePlan)
	router.DELETE("/:planId", cr.planController.DeletePlanById)
}
