package routers

import (
	"mw-server/internal/auth"
	"mw-server/internal/config"
	"mw-server/internal/controllers"

	"github.com/gin-gonic/gin"
)

type surveyRouter struct {
	surveyController *controllers.SurveyController
	config           *config.Config
}

func newSurveyRouter(surveyController *controllers.SurveyController, config *config.Config) *surveyRouter {
	return &surveyRouter{surveyController, config}
}

func (sr *surveyRouter) setSurveyRoutes(rg *gin.RouterGroup) {
	r := rg.Group("/survey", auth.AuthMiddleware(sr.config))
	r.POST("/user-intro", sr.surveyController.PostSurveyUserIntro)
	r.POST("/looking-for-mentor", sr.surveyController.PostSurveyLookingForMentor)
}