package routers

import (
	"mw-general-bff/internal/auth"
	"mw-general-bff/internal/config"
	"mw-general-bff/internal/controllers"

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
	{
		router.GET("/:provider/callback", ar.authController.GetAuthCallbackFunction)
		router.GET("/:provider", ar.authController.BeginAuth)
		router.GET("/current", auth.HandleHeaders(ar.config), ar.authController.GetCurrentAuthorizedUserByToken)
		router.GET("/logout/:provider", auth.HandleHeaders(ar.config), ar.authController.Logout)
		router.GET("/google-token", auth.HandleHeaders(ar.config), ar.authController.GetGoogleAccessToken)
		router.POST("/refreshToken", ar.authController.RefreshAccessToken)
		if ar.config.EnvType != "prod" {
			router.GET("/login/local/:userEmail", ar.authController.GetUserTokenByEmail)
		}
	}
}
