package routers

import (
	"mw-general/internal/controllers"

	"github.com/gin-gonic/gin"
)

type geminiRouter struct {
	geminiController *controllers.GeminiController
}

func newGeminiRouter(geminiController *controllers.GeminiController) *geminiRouter {
	return &geminiRouter{geminiController}
}

func (gr *geminiRouter) setGeminiRoutes(rg *gin.RouterGroup) {
	router := rg.Group("gemini")
	router.POST("/metrics", gr.geminiController.GenerateMetrics)
	router.POST("/just-chat", gr.geminiController.AIChat)
}
