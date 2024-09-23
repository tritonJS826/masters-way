package routers

import (
	"mwsurvey/internal/auth"
	"mwsurvey/internal/controllers"

	"github.com/gin-gonic/gin"
)

type surveyRouter struct {
	surveyController *controllers.SurveyController
}

func newFileRouter(surveyController *controllers.SurveyController) *surveyRouter {
	return &surveyRouter{surveyController}
}

func (fr *surveyRouter) setFileRoutes(rg *gin.RouterGroup) {
	files := rg.Group("/survey", auth.AuthMiddleware())
	files.POST("user-intro", fr.surveyController.PostSurveyUserIntro)
}
