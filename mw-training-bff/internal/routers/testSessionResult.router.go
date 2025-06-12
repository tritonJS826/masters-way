package routers

import (
	"mw-training-bff/internal/auth"
	"mw-training-bff/internal/config"
	"mw-training-bff/internal/controllers"

	"github.com/gin-gonic/gin"
)

type testSessionResultRouter struct {
	testSessionResultController *controllers.TestSessionResultsController
	config                      *config.Config
}

func newTestSessionResultRouter(testSessionResultController *controllers.TestSessionResultsController, config *config.Config) *testSessionResultRouter {
	return &testSessionResultRouter{testSessionResultController, config}
}

func (qR *testSessionResultRouter) setTestSessionResultRoutes(rg *gin.RouterGroup) {
	questions := rg.Group("/testSessionResult", auth.HandleHeaders())
	questions.GET("", auth.HandleHeaders(), qR.testSessionResultController.GetTestSessionResult)
	questions.POST("", auth.HandleHeaders(), qR.testSessionResultController.CreateTestSessionResult)
}
