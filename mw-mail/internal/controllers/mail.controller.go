package controllers

import (
	"fmt"
	"mwmail/internal/schemas"
	"mwmail/internal/services"
	"mwmail/pkg/utils"
	"net/http"

	"github.com/gin-gonic/gin"
)

const (
	ErrMsgRequired = "at least one of the fields 'Message' or 'HtmlMessage' must not be empty"
)

type MailController struct {
	mailService *services.MailService
	smtpService *services.SmtpService
}

func NewMailController(mailService *services.MailService, smtpService *services.SmtpService) *MailController {
	return &MailController{mailService, smtpService}
}

// @Summary Sending messages to recipients and save logs
// @Description Sending messages to recipients by smtp and saving the log of the sent email
// @Tags mail
// @ID send-email
// @Accept  application/json
// @Produce  application/json
// @Param subject body string true "Subject of the email"
// @Param to body array true "Recipient email addresses"
// @Param cc body array false "CC email addresses"
// @Param bcc body array false "BCC email addresses"
// @Param message body string false "Plain text message"
// @Param html_message body string false "HTML message"
// @Success 200 {object} schemas.SendMailResponse
// @Router /mail [post]
func (mc *MailController) SendEmail(ctx *gin.Context) {
	var mailReq schemas.MailRequest

	// retrieving and validating form-Data
	err := ctx.ShouldBindJSON(&mailReq)
	mc.HanldeErrorMail(&mailReq, ctx, err)

	// one of these parameters must be provided
	if mailReq.Message == "" && mailReq.HtmlMessage == "" {
		err := fmt.Errorf("%s", ErrMsgRequired)
		mc.HanldeErrorMail(&mailReq, ctx, err)
	}

	// sending message to recipients
	smtpResp, err := mc.smtpService.SendMail(&mailReq)
	mc.HanldeErrorMail(&mailReq, ctx, err)

	// saving message logs
	mailResp, err := mc.mailService.SaveMail(ctx, smtpResp)
	utils.HandleErrorGin(ctx, err)

	serviceResp := &schemas.SendMailResponse{
		ID:          mailResp.ID,
		FromEmail:   mailResp.FromEmail,
		Recipients:  mailResp.Recipients,
		Subject:     mailResp.Subject,
		Message:     mailResp.Message,
		HtmlMessage: mailResp.HtmlMessage,
	}

	ctx.JSON(http.StatusOK, serviceResp)
}

func (mc *MailController) HanldeErrorMail(mailReq *schemas.MailRequest, ctx *gin.Context, err error) {
	if err != nil {
		mailResp := &schemas.SendSmtpResponse{
			FromEmail:   mc.smtpService.SenderMail,
			FromName:    mc.smtpService.SenderName,
			Recipients:  mailReq.To,
			Cc:          mailReq.Cc,
			Bcc:         mailReq.Bcc,
			ReplyTo:     mailReq.ReplyTo,
			Subject:     mailReq.Subject,
			Message:     mailReq.Message,
			HtmlMessage: mailReq.HtmlMessage,
			Log:         err.Error(),
		}

		_, errDb := mc.mailService.SaveMail(ctx, mailResp)
		if errDb != nil {
			err = fmt.Errorf("main error: %v. Db error: %v", err, errDb)
			utils.HandleErrorGin(ctx, err)
		}

		utils.HandleErrorGin(ctx, err)
	}
}
