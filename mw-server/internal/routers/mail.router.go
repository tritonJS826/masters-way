package routers

import (
	"mw-server/internal/config"
	"mw-server/internal/controllers"

	"github.com/gin-gonic/gin"
)

type mailRouter struct {
	mailController *controllers.MailController
	config         *config.Config
}

func newMailRouter(mailController *controllers.MailController, config *config.Config) *mailRouter {
	return &mailRouter{mailController, config}
}

func (mr *mailRouter) setMailRoutes(rg *gin.RouterGroup) {
	mails := rg.Group("/mail")
	mails.POST("/send", mr.mailController.SendEmail)
}