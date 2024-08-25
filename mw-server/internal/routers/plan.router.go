package routers

import (
	"mwserver/auth"
	"mwserver/internal/controllers"

	"github.com/gin-gonic/gin"
)

type PlanRouter struct {
	planController *controllers.PlanController
}

func NewPlanRouter(planController *controllers.PlanController) *PlanRouter {
	return &PlanRouter{planController}
}

func (pr *PlanRouter) setPlanRoutes(rg *gin.RouterGroup) {
	router := rg.Group("plans")
	router.POST("", auth.AuthMiddleware(), pr.planController.CreatePlan)
	router.PATCH("/:planId", auth.AuthMiddleware(), pr.planController.UpdatePlan)
	router.DELETE("/:planId", auth.AuthMiddleware(), pr.planController.DeletePlanById)
}
