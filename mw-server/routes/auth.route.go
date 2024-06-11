package routes

import (
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
	router.GET("/current", cr.authController.GetCurrentAuthorizedUserByToken)
	router.GET("/logout/:provider", cr.authController.Logout)
}
