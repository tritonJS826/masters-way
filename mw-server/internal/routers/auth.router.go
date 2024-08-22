package routers

import (
	"mwserver/auth"
	"mwserver/config"
	"mwserver/internal/controllers"

	"github.com/gin-gonic/gin"
)

type AuthRouter struct {
	authController *controllers.AuthController
}

func NewAuthRouter(authController *controllers.AuthController) *AuthRouter {
	return &AuthRouter{authController}
}

func (ar *AuthRouter) SetAuthRoutes(rg *gin.RouterGroup) {
	router := rg.Group("auth")
	router.GET("/:provider/callback", ar.authController.GetAuthCallbackFunction)
	router.GET("/:provider", ar.authController.BeginAuth)
	router.GET("/current", auth.AuthMiddleware(), ar.authController.GetCurrentAuthorizedUserByToken)
	router.GET("/logout/:provider", auth.AuthMiddleware(), ar.authController.Logout)
	if config.Env.EnvType != "prod" {
		router.GET("/login/local/:userEmail", ar.authController.GetUserTokenByEmail)
	}
}
