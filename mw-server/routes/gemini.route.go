package routes

import (
	"mwserver/controllers"

	"github.com/gin-gonic/gin"
)

type GeminiRoutes struct {
	geminiController controllers.GeminiController
}

func NewRouteGemini(geminiController controllers.GeminiController) GeminiRoutes {
	return GeminiRoutes{geminiController}
}

func (gr *GeminiRoutes) GeminiRoute(rg *gin.RouterGroup) {
	router := rg.Group("gemini")
	router.POST("/metrics", gr.geminiController.GenerateMetrics)
	router.POST("/just-chat", gr.geminiController.AIChat)
}
