package routers

import (
	"mwserver/auth"
	"mwserver/internal/controllers"

	"github.com/gin-gonic/gin"
)

type FromUserMentoringRequestRouter struct {
	fromUserMentoringRequestController *controllers.FromUserMentoringRequestController
}

func NewFromUserMentoringRequestRouter(fromUserMentoringRequestController *controllers.FromUserMentoringRequestController) *FromUserMentoringRequestRouter {
	return &FromUserMentoringRequestRouter{fromUserMentoringRequestController}
}

func (cr *FromUserMentoringRequestRouter) setFromUserMentoringRequestRoutes(rg *gin.RouterGroup) {
	router := rg.Group("fromUserMentoringRequests")
	router.POST("", auth.AuthMiddleware(), cr.fromUserMentoringRequestController.CreateFromUserMentoringRequest)
	router.DELETE("/:userUuid/:wayUuid", auth.AuthMiddleware(), cr.fromUserMentoringRequestController.DeleteFromUserMentoringRequestById)
}
