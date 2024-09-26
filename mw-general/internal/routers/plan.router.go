package routers

import (
	"mwgeneral/internal/auth"
	"mwgeneral/internal/config"
	"mwgeneral/internal/controllers"

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
	router := rg.Group("plans")
	router.POST("", auth.AuthMiddleware(pr.config), pr.planController.CreatePlan)
	router.PATCH("/:planId", auth.AuthMiddleware(pr.config), pr.planController.UpdatePlan)
	router.DELETE("/:planId", auth.AuthMiddleware(pr.config), pr.planController.DeletePlanById)
}
