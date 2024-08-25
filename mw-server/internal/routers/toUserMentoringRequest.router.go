package routers

import (
	"mwserver/auth"
	"mwserver/internal/controllers"

	"github.com/gin-gonic/gin"
)

type ToUserMentoringRequestRouter struct {
	toUserMentoringRequestController *controllers.ToUserMentoringRequestController
}

func NewToUserMentoringRequestRouter(toUserMentoringRequestController *controllers.ToUserMentoringRequestController) *ToUserMentoringRequestRouter {
	return &ToUserMentoringRequestRouter{toUserMentoringRequestController}
}

func (tr *ToUserMentoringRequestRouter) setToUserMentoringRequestRoutes(rg *gin.RouterGroup) {
	router := rg.Group("toUserMentoringRequests")
	router.POST("", auth.AuthMiddleware(), tr.toUserMentoringRequestController.CreateToUserMentoringRequest)
	router.DELETE("/:userUuid/:wayUuid", auth.AuthMiddleware(), tr.toUserMentoringRequestController.DeleteToUserMentoringRequestById)
}
