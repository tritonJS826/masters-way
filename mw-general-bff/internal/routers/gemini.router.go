package routers

import (
	"mw-general-bff/internal/auth"
	"mw-general-bff/internal/config"
	"mw-general-bff/internal/controllers"

	"github.com/gin-gonic/gin"
)

type geminiRouter struct {
	geminiController *controllers.GeminiController
	config           *config.Config
}

func newGeminiRouter(geminiController *controllers.GeminiController, config *config.Config) *geminiRouter {
	return &geminiRouter{geminiController, config}
}

func (gr *geminiRouter) setGeminiRoutes(rg *gin.RouterGroup) {
	router := rg.Group("gemini")
	{
		router.POST("/metrics", auth.HandleHeaders(gr.config), gr.geminiController.GenerateMetrics)
		router.POST("/just-chat", auth.HandleHeaders(gr.config), gr.geminiController.AIChat)
		router.POST("/generate-plans-by-metric", auth.HandleHeaders(gr.config), gr.geminiController.GeneratePlansByMetric)
		router.POST("/comment-issue", auth.HandleHeaders(gr.config), gr.geminiController.CommentIssue)
		router.POST("/decompose-issue", auth.HandleHeaders(gr.config), gr.geminiController.DecomposeIssue)
		router.POST("/estimate-issue", auth.HandleHeaders(gr.config), gr.geminiController.EstimateIssue)

		router.POST("/trainings/topics", auth.HandleHeaders(gr.config), gr.geminiController.GenerateTopicsForTraining)
		router.POST("/trainings/theoryMaterial", auth.HandleHeaders(gr.config), gr.geminiController.GenerateTheoryMaterialForTraining)
		router.POST("/trainings/practiceMaterial", auth.HandleHeaders(gr.config), gr.geminiController.GeneratePracticeMaterialForTraining)
		router.POST("/training/testSession/:sessionResultId", auth.HandleHeaders(gr.config), gr.geminiController.GenerateTrainingByTestSessionId)

		router.POST("/test/questions", auth.HandleHeaders(gr.config), gr.geminiController.GenerateQuestionsForTest)
	}
}
