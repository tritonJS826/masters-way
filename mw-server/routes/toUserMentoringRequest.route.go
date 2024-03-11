package routes

import (
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
	router.POST("", cr.toUserMentoringRequestController.CreateToUserMentoringRequest)
	router.DELETE("/:userUuid/:wayUuid", cr.toUserMentoringRequestController.DeleteToUserMentoringRequestById)
}
