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

type ICommentController interface {
	CreateComment(ctx *gin.Context)
	UpdateComment(ctx *gin.Context)
	DeleteCommentById(ctx *gin.Context)
}

type IWayTagController interface {
	AddWayTagToWay(ctx *gin.Context)
	DeleteWayTagFromWayByTagId(ctx *gin.Context)
}

type Controller struct {
	IAuthController
	ICommentController
	IWayTagController
}

func NewController(services *services.Service) *Controller {
	return &Controller{
		IAuthController:    NewAuthController(),
		ICommentController: NewCommentController(),
		IWayTagController: NewWayTagController(),
	}
}
