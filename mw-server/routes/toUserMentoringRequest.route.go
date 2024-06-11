package routes

import (
	"mwserver/auth"
	"mwserver/controllers"

	"github.com/gin-gonic/gin"
)

type ToUserMentoringRequestRoutes struct {
	toUserMentoringRequestController controllers.ToUserMentoringRequestController
}

func NewRouteToUserMentoringRequest(toUserMentoringRequestController controllers.ToUserMentoringRequestController) ToUserMentoringRequestRoutes {
	return ToUserMentoringRequestRoutes{toUserMentoringRequestController}
}

func (cr *ToUserMentoringRequestRoutes) ToUserMentoringRequestRoute(rg *gin.RouterGroup) {
	router := rg.Group("toUserMentoringRequests")
	router.POST("", auth.AuthMiddleware(), cr.toUserMentoringRequestController.CreateToUserMentoringRequest)
	router.DELETE("/:userUuid/:wayUuid", auth.AuthMiddleware(), cr.toUserMentoringRequestController.DeleteToUserMentoringRequestById)
}
