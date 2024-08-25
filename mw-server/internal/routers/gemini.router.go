package routers

import (
	"mwserver/internal/controllers"

	"github.com/gin-gonic/gin"
)

type GeminiRouter struct {
	geminiController *controllers.GeminiController
}

func NewGeminiRouter(geminiController *controllers.GeminiController) *GeminiRouter {
	return &GeminiRouter{geminiController}
}

func (gr *GeminiRouter) setGeminiRoutes(rg *gin.RouterGroup) {
	router := rg.Group("gemini")
	router.POST("/metrics", gr.geminiController.GenerateMetrics)
	router.POST("/just-chat", gr.geminiController.AIChat)
}
