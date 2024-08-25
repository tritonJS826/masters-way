package routers

import (
	"mwserver/internal/auth"
	"mwserver/internal/config"
	"mwserver/internal/controllers"

	"github.com/gin-gonic/gin"
)

type authRouter struct {
	authController *controllers.AuthController
	config         *config.Config
}

func newAuthRouter(authController *controllers.AuthController, config *config.Config) *authRouter {
	return &authRouter{authController, config}
}

func (ar *authRouter) setAuthRoutes(rg *gin.RouterGroup) {
	router := rg.Group("auth")
	router.GET("/:provider/callback", ar.authController.GetAuthCallbackFunction)
	router.GET("/:provider", ar.authController.BeginAuth)
	router.GET("/current", auth.AuthMiddleware(ar.config), ar.authController.GetCurrentAuthorizedUserByToken)
	router.GET("/logout/:provider", auth.AuthMiddleware(ar.config), ar.authController.Logout)
	if ar.config.EnvType != "prod" {
		router.GET("/login/local/:userEmail", ar.authController.GetUserTokenByEmail)
	}
}
