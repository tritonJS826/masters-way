package routers

import (
	"mw-general-bff/internal/auth"
	"mw-general-bff/internal/config"
	"mw-general-bff/internal/controllers"

	"github.com/gin-gonic/gin"
)

type planRouter struct {
	planController *controllers.PlanController
	config         *config.Config
}

func newPlanRouter(planController *controllers.PlanController, config *config.Config) *planRouter {
	return &planRouter{planController, config}
}

func (pr *planRouter) setPlanRoutes(rg *gin.RouterGroup) {
	router := rg.Group("plans", auth.HandleHeaders(pr.config))
	{
		router.POST("", pr.planController.CreatePlan)
		router.PATCH("/:planId", pr.planController.UpdatePlan)
		router.DELETE("/:planId", pr.planController.DeletePlanById)
	}
}
