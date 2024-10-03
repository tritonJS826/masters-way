package routers

import (
	"mwsurvey/internal/auth"
	"mwsurvey/internal/controllers"

	"github.com/gin-gonic/gin"
)

type surveyRouter struct {
	surveyController *controllers.SurveyController
}

func newSurveyRouter(surveyController *controllers.SurveyController) *surveyRouter {
	return &surveyRouter{surveyController}
}

func (fr *surveyRouter) setSurveyRoutes(rg *gin.RouterGroup) {
	// files := rg.Group("/survey", auth.AuthMiddleware())
	rg.POST("user-intro", auth.AuthMiddleware(), fr.surveyController.PostSurveyUserIntro)
	rg.POST("looking-for-mentor", auth.AuthMiddleware(), fr.surveyController.PostSurveyLookingForMentor)
}
