package routes

import (
	"mwserver/controllers"

	"github.com/gin-gonic/gin"
)

type AIRoutes struct {
	aiController controllers.AIController
}

func NewRouteAI(aiController controllers.AIController) AIRoutes {
	return AIRoutes{aiController}
}

func (cr *AIRoutes) AIRoute(rg *gin.RouterGroup) {
	router := rg.Group("ai")
	router.POST("/metrics", cr.aiController.GenerateMetrics)
	// router.POST("/comment", cr.aiController.GenerateComment)
}
