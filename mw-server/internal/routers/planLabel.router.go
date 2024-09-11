package routers

import (
	"mwserver/internal/auth"
	"mwserver/internal/config"
	"mwserver/internal/controllers"

	"github.com/gin-gonic/gin"
)

type planLabelRouter struct {
	planLabelController *controllers.PlanLabelController
	config              *config.Config
}

func newPlanLabelRouter(planLabelController *controllers.PlanLabelController, config *config.Config) *planLabelRouter {
	return &planLabelRouter{planLabelController, config}
}

func (pr *planLabelRouter) setPlanLabelRoutes(rg *gin.RouterGroup) {
	router := rg.Group("planLabels")
	router.POST("", auth.AuthMiddleware(pr.config), pr.planLabelController.CreatePlanLabel)
	router.DELETE("/:labelId/:planId", auth.AuthMiddleware(pr.config), pr.planLabelController.DeletePlanLabelById)
}
