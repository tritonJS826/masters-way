package routers

import (
	"mw-server/internal/auth"
	"mw-server/internal/config"
	"mw-server/internal/controllers"

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
	router.POST("/metrics", auth.AuthMiddleware(gr.config), gr.geminiController.GenerateMetrics)
	router.POST("/just-chat", auth.AuthMiddleware(gr.config), gr.geminiController.AIChat)
	router.POST("/generate-plans-by-metric", auth.AuthMiddleware(gr.config), gr.geminiController.GeneratePlansByMetric)
	router.POST("/comment-issue", auth.AuthMiddleware(gr.config), gr.geminiController.CommentIssue)
	router.POST("/decompose-issue", auth.AuthMiddleware(gr.config), gr.geminiController.DecomposeIssue)
	router.POST("/estimate-issue", auth.AuthMiddleware(gr.config), gr.geminiController.EstimateIssue)

	router.POST("/trainings/description", auth.AuthMiddleware(gr.config), gr.geminiController.GenerateTrainingDescriptionByTestResults)
	router.POST("/trainings/topics", auth.AuthMiddleware(gr.config), gr.geminiController.GenerateTopicsForTraining)
	router.POST("/trainings/theoryMaterial", auth.AuthMiddleware(gr.config), gr.geminiController.GenerateTheoryMaterialForTopic)
	router.POST("/trainings/practiceMaterial", auth.AuthMiddleware(gr.config), gr.geminiController.GeneratePracticeMaterialForTopic)

	router.POST("/test/questions", auth.AuthMiddleware(gr.config), gr.geminiController.GenerateQuestionsForTest)
	router.POST("/test/questionResult", auth.AuthMiddleware(gr.config), gr.geminiController.AiGenerateQuestionResult)

}
