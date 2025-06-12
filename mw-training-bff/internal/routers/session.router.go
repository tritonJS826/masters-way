package routers

import (
	"mw-training-bff/internal/auth"
	"mw-training-bff/internal/config"
	"mw-training-bff/internal/controllers"

	"github.com/gin-gonic/gin"
)

type sessionRouter struct {
	sessionController *controllers.SessionController
	config            *config.Config
}

func newSessionRouter(sessionController *controllers.SessionController, config *config.Config) *sessionRouter {
	return &sessionRouter{sessionController, config}
}

func (qR *sessionRouter) setSessionRoutes(rg *gin.RouterGroup) {
	questions := rg.Group("/session", auth.HandleHeaders())
	questions.POST("", auth.HandleHeaders(), qR.sessionController.CreateSession)
}
