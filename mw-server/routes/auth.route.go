package routes

import (
	"mwserver/auth"
	"mwserver/config"
	"mwserver/controllers"

	"github.com/gin-gonic/gin"
)

type AuthRoutes struct {
	authController controllers.AuthController
}

func NewRouteAuth(authController controllers.AuthController) AuthRoutes {
	return AuthRoutes{authController}
}

func (cr *AuthRoutes) AuthRoute(rg *gin.RouterGroup) {
	router := rg.Group("auth")
	router.GET("/:provider/callback", cr.authController.GetAuthCallbackFunction)
	router.GET("/:provider", cr.authController.BeginAuth)
	router.GET("/current", auth.AuthMiddleware(), cr.authController.GetCurrentAuthorizedUserByToken)
	router.GET("/logout/:provider", auth.AuthMiddleware(), cr.authController.Logout)
	if config.Env.EnvType != "prod" {
		router.GET("/login/local/:userEmail", cr.authController.GetUserTokenByEmail)
	}
}
