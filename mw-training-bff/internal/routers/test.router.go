package routers

import (
	"mw-training-bff/internal/auth"
	"mw-training-bff/internal/config"
	"mw-training-bff/internal/controllers"

	"github.com/gin-gonic/gin"
)

type testRouter struct {
	testController *controllers.TestController
	config         *config.Config
}

func newTestRouter(testController *controllers.TestController, config *config.Config) *testRouter {
	return &testRouter{testController, config}
}

func (qR *testRouter) setTestRoutes(rg *gin.RouterGroup) {
	tests := rg.Group("/test")
	tests.POST("", auth.HandleHeaders(), qR.testController.CreateTest)
	tests.PATCH(":testId", auth.HandleHeaders(), qR.testController.UpdateTest)
	tests.DELETE(":testId", auth.HandleHeaders(), qR.testController.DeleteTest)
	tests.GET("", qR.testController.GetTestList)
	tests.GET("amount/user/:userId", qR.testController.GetTestsAmountByUserId)
	tests.GET("user/:userId", auth.HandleOptionalHeaders(), qR.testController.GetTestsByUserId)
	tests.GET(":testId", auth.HandleHeaders(), qR.testController.GetTestById)
}
