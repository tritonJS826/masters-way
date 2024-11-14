package routers

import (
	"mw-server/internal/auth"
	"mw-server/internal/config"
	"mw-server/internal/controllers"

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
	router := rg.Group("fromUserMentoringRequests")
	router.POST("", auth.AuthMiddleware(cr.config), cr.fromUserMentoringRequestController.CreateFromUserMentoringRequest)
	router.DELETE("/:userUuid/:wayUuid", auth.AuthMiddleware(cr.config), cr.fromUserMentoringRequestController.DeleteFromUserMentoringRequestById)
}
