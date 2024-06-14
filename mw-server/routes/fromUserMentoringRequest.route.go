package routes

import (
	"mwserver/auth"
	"mwserver/controllers"

	"github.com/gin-gonic/gin"
)

type FromUserMentoringRequestRoutes struct {
	fromUserMentoringRequestController controllers.FromUserMentoringRequestController
}

func NewRouteFromUserMentoringRequest(fromUserMentoringRequestController controllers.FromUserMentoringRequestController) FromUserMentoringRequestRoutes {
	return FromUserMentoringRequestRoutes{fromUserMentoringRequestController}
}

func (cr *FromUserMentoringRequestRoutes) FromUserMentoringRequestRoute(rg *gin.RouterGroup) {
	router := rg.Group("fromUserMentoringRequests")
	router.POST("", auth.AuthMiddleware(), cr.fromUserMentoringRequestController.CreateFromUserMentoringRequest)
	router.DELETE("/:userUuid/:wayUuid", auth.AuthMiddleware(), cr.fromUserMentoringRequestController.DeleteFromUserMentoringRequestById)
}
