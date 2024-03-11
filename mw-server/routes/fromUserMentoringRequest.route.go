package routes

import (
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
	router.POST("", cr.fromUserMentoringRequestController.CreateFromUserMentoringRequest)
	router.DELETE("/:userUuid/:wayUuid", cr.fromUserMentoringRequestController.DeleteFromUserMentoringRequestById)
}
