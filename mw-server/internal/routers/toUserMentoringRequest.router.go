package routers

import (
	"mw-server/internal/auth"
	"mw-server/internal/config"
	"mw-server/internal/controllers"

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
	router := rg.Group("toUserMentoringRequests")
	router.POST("", auth.AuthMiddleware(tr.config), tr.toUserMentoringRequestController.CreateToUserMentoringRequest)
	router.DELETE("/:userUuid/:wayUuid", auth.AuthMiddleware(tr.config), tr.toUserMentoringRequestController.DeleteToUserMentoringRequestById)
}
