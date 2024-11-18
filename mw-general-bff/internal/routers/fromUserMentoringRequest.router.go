package routers

import (
	"mw-general-bff/internal/auth"
	"mw-general-bff/internal/config"
	"mw-general-bff/internal/controllers"

	"github.com/gin-gonic/gin"
)

type fromUserMentoringRequestRouter struct {
	fromUserMentoringRequestController *controllers.FromUserMentoringRequestController
	config                             *config.Config
}

func newFromUserMentoringRequestRouter(fromUserMentoringRequestController *controllers.FromUserMentoringRequestController, config *config.Config) *fromUserMentoringRequestRouter {
	return &fromUserMentoringRequestRouter{fromUserMentoringRequestController, config}
}

func (cr *fromUserMentoringRequestRouter) setFromUserMentoringRequestRoutes(rg *gin.RouterGroup) {
	router := rg.Group("fromUserMentoringRequests", auth.HandleHeaders(cr.config))
	router.POST("", cr.fromUserMentoringRequestController.CreateFromUserMentoringRequest)
	router.DELETE("/:userUuid/:wayUuid", cr.fromUserMentoringRequestController.DeleteFromUserMentoringRequestById)
}
