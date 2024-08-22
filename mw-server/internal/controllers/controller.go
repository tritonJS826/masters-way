package controllers

import (
	"mwserver/internal/services"

	"github.com/gin-gonic/gin"
)

type IAuthController interface {
	GetAuthCallbackFunction(ctx *gin.Context)
	BeginAuth(ctx *gin.Context)
	GetCurrentAuthorizedUserByToken(ctx *gin.Context)
	GetUserTokenByEmail(ctx *gin.Context)
	Logout(ctx *gin.Context)
}

type Controller struct {
	IAuthController
}

func NewController(services *services.Service) *Controller {
	return &Controller{
		IAuthController: NewAuthController(),
	}
}
