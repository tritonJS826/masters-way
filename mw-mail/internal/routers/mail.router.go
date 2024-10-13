package routers

import (
	"mwmail/internal/auth"
	"mwmail/internal/controllers"

	"github.com/gin-gonic/gin"
)

type mailRouter struct {
	mailController *controllers.MailController
}

func newMailRouter(mailController *controllers.MailController) *mailRouter {
	return &mailRouter{mailController}
}

func (mr *mailRouter) setMailRoutes(rg *gin.RouterGroup) {
	mails := rg.Group("/send", auth.AuthMiddleware())

	mails.POST("", mr.mailController.SendEmail)
}
