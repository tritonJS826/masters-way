package controllers

import (
	"fmt"
	"mwmail/internal/schemas"
	"mwmail/internal/services"
	"mwmail/pkg/utils"
	"net/http"

	"github.com/gin-gonic/gin"
)

type MailController struct {
	mailService *services.MailService
	smtpService *services.SmtpService
}

func NewMailController(mailService *services.MailService, smtpService *services.SmtpService) *MailController {
	return &MailController{mailService, smtpService}
}

// @Summary Sending messages to recipients and save logs
// @Description Sending messages to recipients by smtp and saving the log of the sent mail
// @Tags mail
// @ID send-mail
// @Accept  application/json
// @Produce  application/json
// @Param subject body string true "Subject of the mail"
// @Param to body array true "Recipient mail addresses"
// @Param cc body array false "CC mail addresses"
// @Param bcc body array false "BCC mail addresses"
// @Param message body string true "Message content to be sent. Can be plain text or HTML-formatted text"
// @Success 200 {object} schemas.SendMailResponse
// @Router /mail [post]
func (mc *MailController) SendEmail(ctx *gin.Context) {
	var mailReq schemas.MailRequest

	err := ctx.ShouldBindJSON(&mailReq)
	mc.HanldeErrorMail(&mailReq, ctx, err)

	smtpResp, err := mc.smtpService.SendMail(&mailReq)
	mc.HanldeErrorMail(&mailReq, ctx, err)

	mailResp, err := mc.mailService.SaveMailResultToDB(ctx, smtpResp)
	utils.HandleErrorGin(ctx, err)

	serviceResp := &schemas.SendMailResponse{
		ID:         mailResp.ID,
		SenderMail: mailResp.SenderMail,
		SenderName: mailResp.SenderName,
		Recipients: mailResp.Recipients,
		Cc:         mailResp.Cc,
		Bcc:        mailResp.Bcc,
		ReplyTo:    mailResp.ReplyTo,
		Subject:    mailResp.Subject,
		Message:    mailResp.Message,
	}

	ctx.JSON(http.StatusOK, serviceResp)
}

func (mc *MailController) HanldeErrorMail(mailReq *schemas.MailRequest, ctx *gin.Context, err error) {
	if err != nil {
		mailResp := &schemas.SendSmtpResponse{
			SenderMail: mc.smtpService.SenderMail,
			SenderName: mc.smtpService.SenderName,
			Recipients: mailReq.Recipients,
			Cc:         mailReq.Cc,
			Bcc:        mailReq.Bcc,
			ReplyTo:    mailReq.ReplyTo,
			Subject:    mailReq.Subject,
			Message:    mailReq.Message,
			Log:        err.Error(),
		}

		_, errDb := mc.mailService.SaveMailResultToDB(ctx, mailResp)
		if errDb != nil {
			err = fmt.Errorf("main error: %v. Db error: %v", err, errDb)
			utils.HandleErrorGin(ctx, err)
		}

		utils.HandleErrorGin(ctx, err)
	}
}
