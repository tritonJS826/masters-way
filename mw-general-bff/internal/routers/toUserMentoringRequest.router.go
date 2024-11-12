package routers

import (
	"mw-general-bff/internal/auth"
	"mw-general-bff/internal/config"
	"mw-general-bff/internal/controllers"

	"github.com/gin-gonic/gin"
)

type toUserMentoringRequestRouter struct {
	toUserMentoringRequestController *controllers.ToUserMentoringRequestController
	config                           *config.Config
}

func newToUserMentoringRequestRouter(toUserMentoringRequestController *controllers.ToUserMentoringRequestController, config *config.Config) *toUserMentoringRequestRouter {
	return &toUserMentoringRequestRouter{toUserMentoringRequestController, config}
}

func (tr *toUserMentoringRequestRouter) setToUserMentoringRequestRoutes(rg *gin.RouterGroup) {
	router := rg.Group("toUserMentoringRequests", auth.HandleHeaders(tr.config))
	{
		router.POST("", tr.toUserMentoringRequestController.CreateToUserMentoringRequest)
		router.DELETE("/:userUuid/:wayUuid", tr.toUserMentoringRequestController.DeleteToUserMentoringRequestById)
	}
}
