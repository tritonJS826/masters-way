package routers

import (
	"mw-server/internal/controllers"

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
	router.POST("/generate-plans-by-metric", gr.geminiController.GeneratePlansByMetric)
	router.POST("/comment-issue", gr.geminiController.CommentIssue)
	router.POST("/decompose-issue", gr.geminiController.DecomposeIssue)
	router.POST("/estimate-issue", gr.geminiController.EstimateIssue)
	router.POST("/trainings/topics", gr.geminiController.GenerateTopicsForTraining)
	router.POST("/trainings/theoryMaterial", gr.geminiController.GenerateTheoryMaterialForTopic)
	router.POST("/trainings/practiceMaterial", gr.geminiController.GeneratePracticeMaterialForTopic)

}
